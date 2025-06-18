import { useState } from "react";
import styles from "./Basket.module.scss";
import BasketPreviewItem from "./BasketPreviewItem";
import { useCustomer } from "./CustomerContext";

import { toStringAdresse } from "./types";
import GenericModal from "./GenericModal";
import SearchItem from "./SearchItem";
import { useCustomerwithOrdersLines } from "./hooks/customers/useCustomer";
import {
  useCreateOrder,
  useUpdateOrder,
} from "./hooks/Orders/useOrderMutation";

function getFirstIncompleteOrder(customer) {
  const order = customer.orders.find((o) => o.status === "PENDING");
  return order || null;
}

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
  const [orderData, setOrderData] = useState(getFirstIncompleteOrder(client));
  const createOrderMutation = useCreateOrder();
  const updateOrderMutation = useUpdateOrder();

  const [showItems, setShowItems] = useState(false);
  /*   const [order, setOrder] = useState(null);
   */ const [totalPrice, setTotalPrice] = useState(0);

  const {
    data: customer,
    isLoading,
    error,
  } = useCustomerwithOrdersLines(client?.id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(" customer : ", customer);
  console.log(" client : ", client);
  const firstOrder = getFirstIncompleteOrder(customer) || {};

  console.log("nouvelleLigne", nouvelleLigne);
  console.log("firstOrder avant ", firstOrder);

  if (firstOrder && nouvelleLigne != null) {
    ajouterOuCumulerOrderLine(firstOrder, nouvelleLigne);
  }
  console.log("firstOrder apres ", firstOrder);

  /*
  setOrder(firstOrder);
  setTotalPrice(firstOrder.totalPrice || 0); */

  const handleUpdate = () => {
    setTotalPrice(firstOrder.totalPrice);
  };
  const handleDelete = (i) => {
    firstOrder.order_lines = firstOrder.order_lines.filter(
      (line) => line.id !== i
    );
  };

  const handleCreateOrder = () => {
    firstOrder.status = "VALIDATED";
    console.log(firstOrder);
    if (firstOrder.id != null) {
      updateOrderMutation.mutate(firstOrder);
    } else {
      createOrderMutation.mutate(firstOrder);
    }
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
            <SearchItem order={firstOrder} />
          </GenericModal>
        )}
        <div
          className={`${styles.Order}  basket-list flex-fill  d-flex flex-column mb-3`}
        >
          {(!firstOrder ||
            !firstOrder.order_lines ||
            firstOrder.order_lines.length === 0) && (
            <p>Vous n'avez pas encore sélectionné de repas.</p>
          )}

          <div className={`${styles.BasketList}`}>
            {firstOrder &&
              firstOrder.order_lines &&
              firstOrder.order_lines?.map((orderLine, index) =>
                orderLine.quantity > 0 ? (
                  <BasketPreviewItem
                    key={index}
                    isSearchComponent={false}
                    order={firstOrder}
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
          <p>{totalPrice} €</p>
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
