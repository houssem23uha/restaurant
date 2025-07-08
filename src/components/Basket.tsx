import {  useState } from "react";
import styles from "./Basket.module.scss";
import BasketPreviewItem from "./BasketPreviewItem";
import { useCustomer } from "./CustomerContext";
import { toStringAdresse } from "./types";
import GenericModal from "./GenericModal";
import SearchItem from "./SearchItem";
import { useCustomerwithOrdersLines } from "./hooks/customers/useCustomer";
import { useCreateOrder, useUpdateOrder } from "./hooks/Orders/useOrderMutation";
import { useNavigate } from "react-router-dom";




function ajouterOuCumulerOrderLine(order, nouvelleLigne) {
  const ligneExistante = order?.order_lines?.find(
    (ligne) => ligne.item.ref === nouvelleLigne.item.ref
  );

  if (ligneExistante) {
    ligneExistante.quantity += nouvelleLigne.quantity;
    ligneExistante.line_price += nouvelleLigne.line_price;
  } else {
    order?.order_lines?.push(nouvelleLigne);
  }
}








function Basket({ client, nouvelleLigne = null }) {
  const navigate = useNavigate();
  const { setOrder  } = useCustomer();
  const { order } = useCustomer();
   const { customer: clientConnecte, setCustomer } = useCustomer();

  const createOrderMutation = useCreateOrder();
  const updateOrderMutation = useUpdateOrder();
  const [showItems, setShowItems] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Récupération du client avec ses commandes et lignes de commande
  // On utilise le hook personnalisé useCustomerwithOrdersLines
  const {
    data: customer,
    isLoading,
    error,
    refetch,
  } = useCustomerwithOrdersLines(clientConnecte?.id);

 
 // console.log("client", client);
 // console.log("Customer", customer);
 // console.log("orderGlobale", order);



  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  const handleUpdate = () => {
   // console.log("handleUpdate", order, order.totalPrice);
    setTotalPrice(order.totalPrice);
  };
  const handleDelete = (i) => {
    order.order_lines = order.order_lines.filter(
      (line) => line.id !== i
    );
  };
const handleCreateOrder = async () => {
  if (!order || !customer) return;

  console.log("handleCreateOrder", order);
  const validatedOrder = {
    ...order,
    status: "VALIDATED",
    //customer: { id: customer.id },
  };
  console.log("validatedOrder", validatedOrder);

  try {
    if (validatedOrder.id) {
      await updateOrderMutation.mutateAsync(validatedOrder);
     // console.log("Order mis à jour et validé");
    }

    const newOrder = {
      status: "PENDING" as const,
      customer: { id: customer.id },
      order_lines: [],
      totalPrice: 0,
    };

    const createdOrder = await createOrderMutation.mutateAsync(newOrder);
    setOrder(createdOrder);
    
    //console.log("Nouvelle commande PENDING créée :", createdOrder);

  } catch (error) {
    console.error("Erreur lors de la validation/création de commande :", error);
  }
  navigate("/orders");
};

  return (
    <div
      className={`${styles.PanierComponent} flex-fill row d-flex flex-column`}
    >
      <div
        className={`${styles.ShippingAddress} col-auto d-flex justify-content-between align-items-center mb-3 `}
      >
        <span>{toStringAdresse(customer?.addresses?.[0])}</span>

        <button className="d-flex align-items-center">
          <i className="fa-solid fa-arrows-rotate me-1"></i>
          <span>Changer</span>
        </button>
      </div>
      <div
        className={`${styles.Content} col content flex-fil d-flex flex-column justify-content-center`}
      >
        <div
          className={`${styles.AdditionCard} d-flex flex-column justify-content-center align-items-center mb-3 gap-3`}
        >
          <span>Besoin de quelque chose en particulier ?</span>
          <button
            className="d-flex align-items-center"
            onClick={() => setShowItems(true)}
          >
            <i className="fa-solid fa-arrows-rotate me-2"></i>
            <span>Ajouter un plat</span>
          </button>
        </div>
        {showItems && (
          <GenericModal
            show={showItems}
            showHeader={true}
            onClose={() => setShowItems(false)}
            title="Ajouter un produit"
            placement="start"
          >
            <SearchItem order={order} onClose={() => setShowItems(false)} />
          </GenericModal>
        )}
        <div
          className={`${styles.Order}  basket-list flex-fill  d-flex flex-column mb-3`}
        >
          

          {(!order ||
            !order.order_lines ||
            order.order_lines.length === 0) && (
            <p>Vous n'avez pas encore sélectionné de repas.</p>
          )}

          <div className={`${styles.BasketList}`}>
            {order &&
              order.order_lines &&
              order?.order_lines?.map((orderLine, index) =>
                orderLine.quantity > 0 ? (
                  <BasketPreviewItem
                    key={index}
                    isSearchComponent={false}
                    ligne={orderLine}
                    onLineChange={handleUpdate}
                    onLineDelete={handleDelete}
                  />
                ) : null
              )}
          </div>
        </div>
      </div>

      <div
        className={`${styles.PlaceOrder} col-auto d-flex justify-content-between align-items-center`}
      >
        <div className={`${styles.TotalPrice} d-flex flex-column`}>
          <p>{order.totalPrice} €</p>
          <span>dans mon panier</span>
        </div>
        <button
          className="Btn Btn-primary d-flex align-items-center"
          onClick={handleCreateOrder}
        >
          <span>Passer commande</span>
        </button>
      </div>
    </div>
  );
}

export default Basket;
