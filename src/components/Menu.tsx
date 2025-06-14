import Breadcrumb from "./Breadcrumb";
import { useLocation } from "react-router-dom";
import styles from "./Menu.module.scss";
import Recipe from "./recipe";
import SliderTabs from "./SliderTabs";
/* import { useEffect, useRef, useState } from "react";

const tabsData = ["Entree", "Plat", "Dessert", "Boisson"]; */

function Menu() {
  const location = useLocation();
  /*
   */
  return (
    <>
      <div className={`${styles.MenuContent}`}>
        <div className="row">
          <Breadcrumb location={location} />
        </div>
        <div
          className={`${styles.MenuTitle} d-flex justify-content-center mb-3`}
        >
          <i className="fa-solid fa-utensils"></i>
          <span>Menu</span>
          <i className="fa-solid fa-utensils"></i>
        </div>

        <div className="row d-flex flex-column gap-3 mb-3">
          <SliderTabs />
        </div>

        <div className="grid my-5">
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
          <Recipe vote={false} />
        </div>
      </div>
    </>
  );
}

export default Menu;
