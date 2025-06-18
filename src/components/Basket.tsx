import { useEffect, useState } from "react";
import styles from "./Basket.module.scss";
import BasketPreviewItem from "./BasketPreviewItem";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(
    client?.addresses?.[0]
  );

  const createOrderMutation = useCreateOrder();
  const updateOrderMutation = useUpdateOrder();

  const [isCreatingOrder, setIsCreatingOrder] = useState(false);

  const [showItems, setShowItems] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const {
    data: customer,
    isLoading,
    error,
    refetch,
  } = useCustomerwithOrdersLines(client?.id);

  const [orderData, setOrderData] = useState(getFirstIncompleteOrder(customer));
  const updateLineMutation = useUpdateOrderLine(); // hook mutation de ligne

  const [ligneMajEnBase, setLigneMajEnBase] = useState(false);

  useEffect(() => {
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
          setLigneMajEnBase(true);
          refetch();
        },
        onError: (err) => {
          console.error("Erreur lors de la mise à jour de la ligne :", err);
        },
      });
    }
  }, [orderData, nouvelleLigne, ligneMajEnBase]);

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
  useEffect(() => {
    if (customer?.addresses?.length > 0) {
      setSelectedAddress(customer.addresses[0]);
    }
  }, [client]);

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

    navigate("/orders");
  };

  const toStringAdresse = (address) => {
    if (!address) return "";
    return `${address.street}, ${address.city}, ${address.postalCode}`;
  };

  const handleChangeAdresse = (e) => {
    const index = parseInt(e.target.value, 10);
    setSelectedAddress(customer.addresses[index]);
    setShowDropdown(false); // cacher la liste après sélection
  };

  return (
    <div
      className={`${styles.PanierComponent} flex-fill row d-flex flex-column`}
    >
      <div
        className={`${styles.ShippingAddress} col-auto d-flex flex-column mb-3`}
      >
        {!showDropdown ? (
          <div className="d-flex justify-content-between align-items-center w-100">
            <span>{toStringAdresse(selectedAddress)}</span>
            <button
              type="button"
              className="d-flex align-items-center"
              onClick={() => setShowDropdown(true)}
            >
              <i className="fa-solid fa-arrows-rotate me-1"></i>
              <span>Changer</span>
            </button>
          </div>
        ) : (
          <select
            className="form-select mt-2"
            onChange={handleChangeAdresse}
            value={customer.addresses.indexOf(selectedAddress)}
            onBlur={() => setShowDropdown(false)} // optionnel pour fermer la liste si click à l’extérieur
            autoFocus
          >
            {customer.addresses.map((addr, index) => (
              <option key={index} value={index}>
                {toStringAdresse(addr)}
              </option>
            ))}
          </select>
        )}
      </div>

      <div
        className={`${styles.Content} col content flex-fill d-flex flex-column justify-content-center`}
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
            <SearchItem
              order={orderData}
              onOrderDataChange={setOrderData}
              onClose={() => setShowItems(false)}
            />
          </GenericModal>
        )}
        <div
          className={`${styles.Order}  basket-list flex-fill  d-flex flex-column mb-3`}
        >
          {(!orderData ||
            !orderData.order_lines ||
            orderData.order_lines.length === 0) && (
            <p>Vous n'avez pas encore sélectionné de repas.</p>
          )}
          <div className={`${styles.BasketList} `}>
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
                    setOrderChange={() => {}}
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
