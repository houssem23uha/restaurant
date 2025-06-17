import styles from "./BasketPreviewItem.module.scss";
import itemImage from "../assets/images/default.jpg";
import { useState } from "react";
import {
  useDeleteOrderLine,
  useUpdateOrderLine,
} from "./hooks/OrderLines.ts/OrderLinesMutation";

function BasketPreviewItem({
  isSearchComponent,
  order,
  ligne,
  onLineChange,
  onLineDelete,
}) {
  const priceItem = ligne?.item?.price;
  const [nbItem, setNbItem] = useState(ligne.quantity);
  const [priceLine, setPriceLine] = useState(ligne.line_price);
  const [version, setVersion] = useState(ligne.version);

  const onSuccess = () => {
    setVersion(version + 1);
  };

  const updateMutation = useUpdateOrderLine();
  const deleteMutation = useDeleteOrderLine();

  const handleAdd = () => {
    updateMutation.mutate(
      {
        ...ligne,
        order: {
          id: order.id,
        },
        version,
      },
      {
        onSuccess: () => onSuccess && onSuccess(),
      }
    );
  };

  const handleRemove = () => {
    if (nbItem - 1 > 0) {
      updateMutation.mutate(
        {
          ...ligne,
          order: {
            id: order.id,
          },
          version,
        },
        {
          onSuccess: () => onSuccess && onSuccess(),
        }
      );
    } else {
      deleteMutation.mutate(ligne.id);
      onLineDelete(ligne.id);
    }
  };

  const handleDeleteButton = () => {
    order.totalPrice -= ligne.line_price;
    ligne.quantity = 0;
    onLineChange();
    const id = ligne.id;
    deleteMutation.mutate(id);
    order.order_lines = order.order_lines.filter((line) => line.id !== id);

    onLineDelete(ligne.id);
  };

  const handleAddToCart = () => {};

  const addItem = () => {
    setNbItem(nbItem + 1);
    ligne.quantity += 1;
    ligne.line_price += priceItem;
    setPriceLine(ligne.line_price);
    order.totalPrice += priceItem;
    order.order_lines = order.order_lines.map((line) =>
      line.id === ligne.id ? ligne : line
    );
    onLineChange();
    handleAdd();
  };

  const removeItem = () => {
    if (nbItem > 0) {
      setNbItem(nbItem - 1);
      ligne.quantity -= 1;
      ligne.line_price -= priceItem;
      setPriceLine(ligne.line_price);
      order.totalPrice -= priceItem;
      order.order_lines = order.order_lines.map((line) =>
        line.id === ligne.id ? ligne : line
      );
      onLineChange();
      handleRemove();
    }
  };

  return (
    <div className={`${styles.PreviewItem} d-flex flex-column`}>
      <div className={`${styles.InfoContainer} d-flex justify-content-start`}>
        <div className={`${styles.PictureContainer}`}>
          <img src={itemImage} alt="item" />
        </div>
        <div
          className={`${styles.InfosAndAction} flex-fill d-flex justify-item-center align-items-center gap-3`}
        >
          <div className={`${styles.Infos} flex-fill d-flex flex-column gap-2`}>
            <span>Fromage blanc nature 400g</span>
            <div className={`${styles.Capacity}`}>
              <span>{priceItem} €</span>
            </div>
          </div>
          <button
            onClick={() => {
              if (!isSearchComponent) {
                handleDeleteButton(); // Action quand isSearchComponent est false
              } else {
                handleAddToCart(); // Action quand isSearchComponent est true
              }
            }}
          >
            {!isSearchComponent && (
              <i className="fa-solid fa-trash fa fa-lg"></i>
            )}
            {isSearchComponent && (
              <>
                <i className="fa-solid fa-cart-shopping fa fa-lg"></i>
                <i className="fa-solid fa-plus fa fa-xs"></i>
              </>
            )}
          </button>
        </div>
      </div>
      <div
        className={`${styles.PriceAndAction} d-flex justify-content-between align-item-center`}
      >
        <span>{priceLine} €</span>
        <div
          className={`${styles.CounterInput} d-flex flex-row justify-content-center align-item-center gap-2`}
        >
          <button onClick={() => removeItem()}>
            <i className="fa-solid fa-minus"></i>
          </button>
          <span className="InputValueContainer">{ligne.quantity}</span>
          <button onClick={() => addItem()}>
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BasketPreviewItem;
