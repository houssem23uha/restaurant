import { useEffect, useState } from "react";
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

import { useUpdateOrderLine } from "./hooks/OrderLines.ts/OrderLinesMutation";

import type { Status } from "./types";

function getFirstIncompleteOrder(customer) {
  const order = customer?.orders?.find((o) => o.status === "PENDING");
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
  const createOrderMutation = useCreateOrder();
  const updateOrderMutation = useUpdateOrder();

  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const [showItems, setShowItems] = useState(false);
  /*   const [order, setOrder] = useState(null);
   */ const [totalPrice, setTotalPrice] = useState(0);

  console.log("client", client);

  const {
    data: customer,
    isLoading,
    error,
    refetch,
  } = useCustomerwithOrdersLines(client?.id);

  const [orderData, setOrderData] = useState(getFirstIncompleteOrder(customer));
  const updateLineMutation = useUpdateOrderLine(); // hook mutation de ligne

  /*   const [memoNouvelleLigne, setMemoNouvelleLigne] = useState(null);
   */
  /*   useEffect(() => {
    if (nouvelleLigne && nouvelleLigne.id !== memoNouvelleLigne?.id) {
      setMemoNouvelleLigne(nouvelleLigne);
    }
  }, [nouvelleLigne]); */

  const [ligneMajEnBase, setLigneMajEnBase] = useState(false);

  useEffect(() => {
    console.log("je rentre", orderData, nouvelleLigne);

    if (
      orderData &&
      nouvelleLigne &&
      !nouvelleLigne.order &&
      orderData.id &&
      !ligneMajEnBase
    ) {
      const ligneAvecOrder = {
        ...nouvelleLigne,
        order: { id: orderData.id },
      };

      updateLineMutation.mutate(ligneAvecOrder, {
        onSuccess: () => {
          console.log("Ligne mise à jour avec succès");
          setLigneMajEnBase(true);
          refetch();
        },
        onError: (err) => {
          console.error("Erreur lors de la mise à jour de la ligne :", err);
        },
      });
    }
    console.log("je sors", orderData, nouvelleLigne, ligneMajEnBase);
  }, [orderData, nouvelleLigne, ligneMajEnBase]);

  console.log("costo", customer);

  useEffect(() => {
    const initializeOrder = async () => {
      if (!customer || isCreatingOrder) return;

      const existingOrder = getFirstIncompleteOrder(customer);

      if (existingOrder) {
        if (nouvelleLigne != null) {
          ajouterOuCumulerOrderLine(existingOrder, nouvelleLigne);
        }
        setOrderData(existingOrder);
        return;
      }

      setIsCreatingOrder(true);

      try {
        const newOrder = {
          status: "PENDING" as Status,
          customer: { id: customer.id },
          order_lines: [nouvelleLigne],
          totalPrice: nouvelleLigne.line_price,
        };

        const createdOrder = await createOrderMutation.mutateAsync(newOrder);

        setOrderData(createdOrder);
      } catch (e) {
        console.error("Erreur création commande :", e);
      } finally {
        setIsCreatingOrder(false);
      }
    };

    initializeOrder();
  }, [customer, nouvelleLigne]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  let firstOrder = getFirstIncompleteOrder(customer) || {};

  const handleUpdate = () => {
    console.log("handleUpdate", firstOrder, firstOrder.totalPrice);
    setTotalPrice(firstOrder.totalPrice);
  };
  const handleDelete = (i) => {
    firstOrder.order_lines = firstOrder.order_lines.filter(
      (line) => line.id !== i
    );
  };

  const handleCreateOrder = () => {
    if (!orderData) return;

    const validatedOrder = {
      ...orderData,
      status: "VALIDATED",
      customer: { id: customer.id },
    };

    if (validatedOrder.id) {
      updateOrderMutation.mutate(validatedOrder);
    } else {
      createOrderMutation.mutate(validatedOrder);
    }

    setOrderData(null);
    setTotalPrice(0);
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
            <SearchItem order={orderData} />
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

          {(!orderData ||
            !orderData.order_lines ||
            orderData.order_lines.length === 0) && (
            <p>Vous n'avez pas encore sélectionné de repas.</p>
          )}

          <div className={`${styles.BasketList}`}>
            {orderData &&
              orderData.order_lines &&
              orderData?.order_lines?.map((orderLine, index) =>
                orderLine.quantity > 0 ? (
                  <BasketPreviewItem
                    key={index}
                    isSearchComponent={false}
                    order={orderData}
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
