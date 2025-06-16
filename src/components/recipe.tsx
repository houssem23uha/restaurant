import styles from "./Recipe.module.scss";
import StarRating from "./StarRating";
import StarRatingVote from "./StarRatingVote";
import defaultImage from "../assets/images/default.jpg"; // import statique

import { capitalizeFirstLetter } from "../utils/helpers";

function Recipe({ vote, item, onRate }) {
  // met a jour rate on click in starRatinVote
  const handleRate = (newRate) => {
    item.rate = newRate;
    if (onRate) {
      onRate(item); // Appel d'un callback externe si fourni
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
        <button className="m-3 px-2">
          <i className="fa-solid fa-cart-shopping fa fa-2x"></i>
          <i className="fa-solid fa-plus fa fa-xs"></i>
        </button>
      </div>
    </div>
  );
}

export default Recipe;
