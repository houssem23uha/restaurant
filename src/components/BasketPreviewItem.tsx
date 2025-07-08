import styles from "./BasketPreviewItem.module.scss";
import itemImage from "../assets/images/default.jpg";
import { useState } from "react";
import {
  useCreateOrderLine,
  useDeleteOrderLine,
  useUpdateOrderLine,
} from "./hooks/OrderLines.ts/OrderLinesMutation";
import { useCustomer } from "./CustomerContext";
import { line } from "framer-motion/client";

function BasketPreviewItem({
  isSearchComponent,
  ligne,
  onLineChange,
  onLineDelete,
  setOrderChange,
  onClose = () => {},
}) {
  const priceItem = ligne?.item?.price;
  const [nbItem, setNbItem] = useState(ligne.quantity);
  const [priceLine, setPriceLine] = useState(ligne.line_price);
  const [version, setVersion] = useState(ligne.version);

  const { order, setOrder, customer } = useCustomer();

  const updateMutation = useUpdateOrderLine();
  const deleteMutation = useDeleteOrderLine();
  const createMutation = useCreateOrderLine();

  // Fonction pour recalculer le totalPrice à partir des lignes
  const recalcTotalPrice = (order_lines) =>
    order_lines.reduce((total, line) => total + line.line_price, 0);

  const updateOrderLocally = (updatedLine) => {
    const updatedOrderLines = order.order_lines.map((line) =>
      line.id === updatedLine.id ? updatedLine : line
    );
    const totalPrice = recalcTotalPrice(updatedOrderLines);
    setOrder({ ...order, order_lines: updatedOrderLines, totalPrice });
  };

  const handleAdd = () => {
    const updatedLigne = {
      id: ligne.id,
      quantity: nbItem + 1,
      line_price: priceLine + priceItem,
      item: { ref: ligne.item.ref },
      order: { id: order.id },
      version,
    };

    updateMutation.mutate(updatedLigne, {
      onSuccess: (updatedLine) => {
        setNbItem((prev) => prev + 1);
        setPriceLine((prev) => prev + priceItem);
        setVersion((v) => v + 1);
        updateOrderLocally(updatedLine);
        onLineChange();
      },
    });
  };

  const handleRemove = () => {
    if (nbItem > 1) {
      const updatedLigne = {
        id: ligne.id,
        quantity: nbItem - 1,
        line_price: priceLine - priceItem,
        item: { ref: ligne.item.ref },
        order: { id: order.id },
        version,
      };

      updateMutation.mutate(updatedLigne, {
        onSuccess: (updatedLine) => {
          setNbItem((prev) => prev - 1);
          setPriceLine((prev) => prev - priceItem);
          setVersion((v) => v + 1);
          updateOrderLocally(updatedLine);
          onLineChange();
        },
      });
    } else {
      deleteMutation.mutate(ligne.id, {
        onSuccess: () => {
          const filteredLines = order.order_lines.filter((l) => l.id !== ligne.id);
          const totalPrice = recalcTotalPrice(filteredLines);
          setOrder({ ...order, order_lines: filteredLines, totalPrice });
          onLineDelete(ligne.id);
          onLineChange();
        },
      });
    }
  };

  const handleDeleteButton = () => {
    deleteMutation.mutate(ligne.id, {
      onSuccess: () => {
        const filteredLines = order.order_lines.filter((line) => line.id !== ligne.id);
        const totalPrice = recalcTotalPrice(filteredLines);
        setOrder({ ...order, order_lines: filteredLines, totalPrice });
        onLineDelete(ligne.id);
        onLineChange();
      },
    });
  };

  const handleAddToCart = () => {
    const ligneTemp = {
      quantity: ligne.quantity,
      line_price: ligne.line_price,
      item: { ref: ligne.item.ref },
      order: { id: order.id },
      version: 0,
    };
    console.log("Ligne temporaire à ajouter :", ligneTemp);
    console.log("ligne actuelle :", ligne);
    console.log(">>>>>>>>>>>>>> DONC  J'affiche :", ligne.item.price);

    // Ajout local temporaire avec recalcul du total
    setOrder((prev) => {
      const newOrderLines = [...prev.order_lines, ligneTemp];
      const totalPrice = recalcTotalPrice(newOrderLines);
      return { ...prev, order_lines: newOrderLines, totalPrice };
    });

    createMutation.mutate(ligneTemp, {
      onSuccess: (createdLine) => {
        setOrder((prev) => {
          const updatedLines = prev.order_lines.map((line) =>
            !line.id &&
            line.item.ref === createdLine.item.ref &&
            line.quantity === createdLine.quantity
              ? createdLine
              : line
          );
          const totalPrice = recalcTotalPrice(updatedLines);
          return { ...prev, order_lines: updatedLines, totalPrice };
        });

        onClose();
      },
      onError: (err) => {
        console.error("Erreur lors de la création :", err);
      },
    });
  };

  return (
    <div className={`${styles.PreviewItem} d-flex flex-column`}>
      <div className={`${styles.InfoContainer} d-flex justify-content-start`}>
        <div className={styles.PictureContainer}>
          <img src={itemImage} alt="item" />
        </div>
        <div className={`${styles.InfosAndAction} flex-fill d-flex align-items-center gap-3`}>
          <div className={`${styles.Infos} flex-fill d-flex flex-column gap-2`}>
            <span>{ligne?.item?.name}</span>
            <div className={styles.Capacity}>
              <span>{ligne.item.price} €</span>
            </div>
          </div>
          <button onClick={isSearchComponent ? handleAddToCart : handleDeleteButton}>
            {isSearchComponent ? (
              <>
                <i className="fa-solid fa-cart-shopping fa fa-lg"></i>
                <i className="fa-solid fa-plus fa fa-xs"></i>
              </>
            ) : (
              <i className="fa-solid fa-trash fa fa-lg"></i>
            )}
          </button>
        </div>
      </div>

      {!isSearchComponent && (
        <div className={`${styles.PriceAndAction} d-flex justify-content-between align-items-center`}>
          <span>{priceLine.toFixed(2)} €</span>
          <div className={`${styles.CounterInput} d-flex gap-2`}>
            <button onClick={handleRemove}>
              <i className="fa-solid fa-minus"></i>
            </button>
            <span className="InputValueContainer">{nbItem}</span>
            <button onClick={handleAdd}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BasketPreviewItem;
