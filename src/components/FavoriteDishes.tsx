import styles from "./Menu.module.scss";
import Recipe from "./recipe";
import SliderTabs from "./SliderTabs";

function FavoriteDishes() {
  return (
    <>
      <div className={`${styles.MenuContent}`}>
        <div
          className={`${styles.MenuTitle} page-title d-flex justify-content-center mb-3`}
        >
          <h1>Plats favoris</h1>
        </div>

        <div className="row d-flex flex-column gap-3 mb-3">
          <SliderTabs />
        </div>

        <div className="grid my-5">
          <Recipe vote={true} />
          <Recipe vote={true} />
          <Recipe vote={true} />
          <Recipe vote={true} />
          <Recipe vote={true} />
          <Recipe vote={true} />
          <Recipe vote={true} />
          <Recipe vote={true} />
          <Recipe vote={true} />
          <Recipe vote={true} />
          <Recipe vote={true} />
          <Recipe vote={true} />
          <Recipe vote={true} />
        </div>
      </div>
    </>
  );
}

export default FavoriteDishes;
