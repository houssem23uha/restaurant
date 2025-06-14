import { useState } from "react";
import styles from "./Basket.module.scss";
import BasketPreviewItem from "./BasketPreviewItem";
import GenericModal from "./GenericModal";
import SearchItem from "./SearchItem";

function Basket() {
  const [showItems, setShowItems] = useState(false);

  const [totalPrice, setTotalPrice] = useState(0);

  return (
    <div
      className={`${styles.PanierComponent} flex-fill row d-flex flex-column`}
    >
      <div
        className={`${styles.ShippingAddress} col-auto d-flex justify-content-between align-items-center mb-3 `}
      >
        <span>Rue Bonnefoi, 75008 Paris</span>
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
          {/*           <p>Vous n'avez pas encore sélectionné de repas.</p>
           */}
          <div className={`${styles.BasketList}`}>
            <BasketPreviewItem
              search={false}
              quantity={0}
              price={3}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
            <BasketPreviewItem
              search={false}
              quantity={0}
              price={6}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
            <BasketPreviewItem
              search={false}
              quantity={0}
              price={2}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
            <BasketPreviewItem
              search={false}
              quantity={0}
              price={2}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
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

export default Basket;
