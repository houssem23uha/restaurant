import Breadcrumb from "./Breadcrumb";
import styles from "./Menu.module.scss";
import Recipe from "./recipe";
import SliderTabs from "./SliderTabs";

function FavoriteDishes() {
  return (
    <>
      <div className={`${styles.MenuContent}`}>
        <div className="row">
          <Breadcrumb location={location} />
        </div>
        <div
          className={`${styles.MenuTitle} d-flex justify-content-center mb-3`}
        >
          <i className="fa-solid fa-crown"></i>
          <span>Plats favoris</span>
          <i className="fa-solid fa-crown"></i>
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
