import styles from "./BasketPreviewItem.module.scss";
import itemImage from "../assets/images/default.jpg";
import { useState } from "react";

function BasketPreviewItem({isSearchComponent, quantity, price, totalPrice, setTotalPrice,}) {
  const priceItem = price;
  const [nbItem, setNbItem] = useState(quantity);
  const [priceLine, setPriceLine] = useState(priceItem * quantity);

  const addItem = () => {
    setNbItem(nbItem + 1);
    setTotalPrice(totalPrice + priceItem);
    setPriceLine(priceLine + priceItem);
  };

  const removeItem = () => {
    if (nbItem > 0) {
      setNbItem(nbItem - 1);
      setTotalPrice(totalPrice - priceItem);
      setPriceLine(priceLine - priceItem);
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
                <span>{price} €</span>
              </div>
            </div>
            <button>
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
            <span className="InputValueContainer">{nbItem}</span>
            <button onClick={() => addItem()}>
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      </div>
  );
}

export default BasketPreviewItem;
