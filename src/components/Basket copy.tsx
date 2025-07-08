import { useEffect, useState } from "react";
import styles from "./Basket.module.scss";
import BasketPreviewItem from "./BasketPreviewItem";
import { useCustomer } from "./CustomerContext";

import { toStringAdresse } from "./types";
import GenericModal from "./GenericModal";
import SearchItem from "./SearchItem";
import { useItemWithAll } from "./hooks/items/useItem";
import { useCustomerswithOrdersLines } from "./hooks/customers/useCustomers";
import { useCustomerwithOrdersLines } from "./hooks/customers/useCustomer";

function getFirstIncompleteOrder(customer) {
  const order = customer.orders.find((o) => o.status === "PENDING");
  return order || null;
}

function BasketA({ client }) {
  const { customer } = useCustomer();
  const [showItems, setShowItems] = useState(false);
  const [order, setOrder] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);

  const [customerId, setCustomerId] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { data: customers, isLoading, error } = useCustomerwithOrdersLines(1);

  console.log("customerWithALL", customers);

  const handleUpdate = () => {
    setTotalPrice(order.totalPrice);
  };
  const handleDelete = (i) => {
    order.order_lines = order.order_lines.filter((line) => line.id !== i);
  };

  useEffect(() => {
    if (customer?.id) {
      setCustomerId(customer.id);

      const firstOrder = getFirstIncompleteOrder(customer) || {};
      setOrder(firstOrder);
      setTotalPrice(firstOrder.totalPrice || 0);
    }
  }, [customer]);

  return (
    <div
      className={`${styles.PanierComponent} flex-fill row d-flex flex-column`}
    >
      <div
        className={`${styles.ShippingAddress} col-auto d-flex justify-content-between align-items-center mb-3 `}
      >
        <span>{toStringAdresse(client?.addresses?.[0])}</span>

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
            <SearchItem />
          </GenericModal>
        )}
        <div
          className={`${styles.Order}  basket-list flex-fill  d-flex flex-column mb-3`}
        >
          {!order && !order.order_lines && order.order_lines.length == 0 && (
            <p>Vous n'avez pas encore sélectionné de repas.</p>
          )}

          <div className={`${styles.BasketList}`}>
            {order?.order_lines?.map((orderLine, index) =>
              orderLine.quantity > 0 ? (
                <BasketPreviewItem
                  key={index}
                  isSearchComponent={false}
                  order={order}
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
        <button className="Btn Btn-primary d-flex align-items-center">
          <span>Passer commande</span>
        </button>
      </div>
    </div>
  );
}

export default BasketA;
