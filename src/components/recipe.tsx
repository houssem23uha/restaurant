import styles from "./Recipe.module.scss";
import recipe from "../assets/images/recette.jpg";
import StarRating from "./StarRating";
import StarRatingVote from "./StarRatingVote";

function Recipe({ vote }) {
  return (
    <div className={`${styles.recipeCard}`}>
      <div className={`${styles.imageContainer} position-relative`}>
        <i className="heart-circle  fa-solid fa-heart fa-2x position-absolute top-0  end-0 z-1 m-4"></i>
        <img className="z-0" src={recipe} alt="recipe" />

        <span className="label position-absolute bottom-0 start-0 z-2 m-3 px-2">
          Entree
        </span>
      </div>

      <div className="d-flex align-items-center">
        <div
          className={`${styles.recipeCardInfo} flex-fill d-flex flex-column justify-content-center align-items-start mt-2`}
        >
          <div className={`${styles.title}`}>Saumon et asperges</div>
          {vote && <StarRatingVote />}
          {!vote && <StarRating rating={4.5} reviews={12} />}
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
