import { useEffect, useRef, useState } from "react";
import styles from "./SearchItem.module.scss";
import BasketPreviewItem from "./BasketPreviewItem";

const tabsData = ["Entree", "Plat", "Dessert", "Boisson"];

function SearchItem() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabsRef = useRef([]);
  const sliderRef = useRef(null);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const activeTab = tabsRef.current[activeIndex];
    if (activeTab && sliderRef.current) {
      sliderRef.current.style.width = `${activeTab.offsetWidth}px`;
      sliderRef.current.style.left = `${activeTab.offsetLeft}px`;
    }
  }, [activeIndex]);

  return (
    <div className={`${styles.SearchItem} flex-fill row d-flex flex-column`}>
      <div className={`${styles.SearchBar} col-auto mb-3 `}>
        <div
          className={`${styles.SearchInputContainer} d-flex justify-content-start align-items-center mb-3`}
        >
          <i className="fa-brands fa-searchengin fa fa-2x"></i>
          <form className=" flex-fill d-flex flex-row align-items-center p-2 gap-2">
            <input
              type="text"
              placeholder="Une recette, un ingrédient..."
              className="flex-fill "
            />
          </form>
        </div>

        <div
          className={`${styles.SliderTabs} d-flex justify-content-center align-items-center gap-2`}
        >
          {tabsData.map((label, index) => (
            <button
              key={index}
              ref={(el) => {
                tabsRef.current[index] = el;
              }}
              className={`${styles.TabButton} flex-grow-1`}
              onClick={() => setActiveIndex(index)}
            >
              {label}
            </button>
          ))}
          <div className={`${styles.Slider}`} ref={sliderRef} />
        </div>
      </div>
      <div
        className={`${styles.Content} col content flex-fil d-flex flex-column justify-content-center`}
      >
        <div
          className={`${styles.Order}  basket-list flex-fill  d-flex flex-column mb-3`}
        >
          {/*           <p>Vous n'avez pas encore sélectionné de repas.</p>
           */}
          <div className={`${styles.BasketList}`}>
            <BasketPreviewItem
              search={true}
              quantity={0}
              price={3}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
            <BasketPreviewItem
              search={true}
              quantity={0}
              price={6}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
            <BasketPreviewItem
              search={true}
              quantity={0}
              price={2}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
            <BasketPreviewItem
              search={true}
              quantity={0}
              price={2}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
