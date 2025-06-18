import { useEffect, useRef, useState } from "react";
import styles from "./SearchItem.module.scss";
import { useItems } from "./hooks/items/useItems";
import BasketPreviewItem from "./BasketPreviewItem";
import SliderTabs from "./SliderTabs";

const tabsData = ["Entree", "Plat", "Dessert", "Boisson"];

function SearchItem({ order }) {
  const { data: items, isLoading, error } = useItems();
  const [filterName, setFilterName] = useState<string>("");

  const [filter, setFilter] = useState<string>("");
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

  if (isLoading) return <p>Chargement...</p>;
  if (error instanceof Error) return <p>Erreur : {error.message}</p>;

  // Appliquer le filtre (ex: par catégorie, type, etc.)
  /*   const filteredItems = filter
    ? items.filter((item) => item.category === filter) // adapte ce champ
    : items; */

  const filteredItems = items.filter((item) => {
    const matchesName = item.name
      .toLowerCase()
      .includes(filterName.toLowerCase());
    console.log(item.name);
    console.log(item.category);
    const matchesCategory = filter ? item.category === filter : true;

    return matchesName || matchesCategory;
  });

  console.log("filteredItems", filteredItems); // Debug

  return (
    <div className={`${styles.SearchItem} flex-fill row d-flex flex-column`}>
      <div className={`${styles.SearchBar} col-auto mb-3 `}>
        <div
          className={`${styles.SearchInputContainer} d-flex justify-content-start align-items-center mb-3`}
        >
          <i className="fa-brands fa-searchengin fa fa-2x"></i>
          <form className="flex-fill d-flex flex-row align-items-center p-2 gap-2">
            <input
              type="text"
              placeholder="Un plat, un dessert..."
              className="flex-fill"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />
          </form>
        </div>

        <div
          className={`${styles.SliderTabs} d-flex justify-content-center align-items-center gap-2`}
        >
          <SliderTabs onFilterChange={setFilter} />
          <div className={`${styles.Slider} flex-grow-1`} ref={sliderRef} />
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
            {filteredItems.map((item) => (
              <BasketPreviewItem
                isSearchComponent={true}
                order={{ order }}
                ligne={{ quantity: 1, line_price: item.price, item }}
                onLineChange={() => {}}
                onLineDelete={() => {}}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
