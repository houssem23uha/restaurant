import styles from "./Recipe.module.scss";
import StarRating from "./StarRating";
import StarRatingVote from "./StarRatingVote";
import defaultImage from "../assets/images/default.jpg"; // import statique

import { capitalizeFirstLetter } from "../utils/helpers";
import GenericModal from "./GenericModal";
import Basket from "./Basket";
import { useState } from "react";
import { useCustomer } from "./CustomerContext";

function Recipe({ vote, item, onRate }) {
  const { customer } = useCustomer();
  const [showPanier, setShowPanier] = useState(false);
  const handleRate = (newRate) => {
    item.rate = newRate;
    if (onRate) {
      onRate(item);
    }
  };

  return (
    <div className={`${styles.recipeCard}`}>
      <div className={`${styles.imageContainer} position-relative`}>
        <i className="heart-circle  fa-solid fa-heart fa-2x position-absolute top-0  end-0 z-1 m-4"></i>

        <img
          className="z-0"
          src={`../assets/images/${item.name}.jpg`}
          alt={item.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null; // pour éviter boucle infinie
            target.src = defaultImage; // image par défaut
          }}
        />

        <span className="label position-absolute bottom-0 start-0 z-2 m-3 px-2">
          {capitalizeFirstLetter(item.category)}
        </span>
      </div>

      <div className="d-flex align-items-center">
        <div
          className={`${styles.recipeCardInfo} flex-fill d-flex flex-column justify-content-center align-items-start mt-2`}
        >
          <div className={`${styles.title}`}>
            {capitalizeFirstLetter(item.name)}
          </div>
          {vote && <StarRatingVote rating={item.rate} onRate={handleRate} />}
          {!vote && <StarRating rating={item.rate} reviews={item.nbRate} />}
        </div>
        <button className="m-3 px-2" onClick={() => setShowPanier(true)}>
          <i className="fa-solid fa-cart-shopping fa fa-2x"></i>
          <i className="fa-solid fa-plus fa fa-xs"></i>
        </button>
        {showPanier && (
          <GenericModal
            show={showPanier}
            showHeader={true}
            onClose={() => setShowPanier(false)}
            title="Mon panier"
            placement="start"
          >
            <Basket
              client={customer}
              nouvelleLigne={{ quantity: 1, line_price: item.price, item }}
            />
          </GenericModal>
        )}
      </div>
    </div>
  );
}

export default Recipe;
