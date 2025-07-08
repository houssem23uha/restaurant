import { useState } from "react";
import styles from "./SearchItem.module.scss";
import { useItems } from "./hooks/items/useItems";
import BasketPreviewItem from "./BasketPreviewItem";

function SearchItem({ order, setOrderDataChange, onClose }) {
  const { data: items, isLoading, error } = useItems();

  const [filter, setFilter] = useState<string>("");

  if (isLoading) return <p>Chargement...</p>;
  if (error instanceof Error) return <p>Erreur : {error.message}</p>;

  // Appliquer le filtre (ex: par catégorie, type, etc.)
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

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
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </form>
        </div>
      </div>
      <div
        className={`${styles.Content} col content flex-fil d-flex flex-column justify-content-center`}
      >
        <div
          className={`${styles.Order}  basket-list flex-fill  d-flex flex-column mb-3`}
        >
          {(!filteredItems || filteredItems.length === 0) && (
            <p>Aucun plat ne correspond à vos critères de recherche.</p>
          )}

          <div className={`${styles.BasketList}`}>
            {filteredItems.map((item) => (
              <BasketPreviewItem
                isSearchComponent={true}
                ligne={{ quantity: 1, line_price: item.price, item }}
                onLineChange={() => {}}
                onLineDelete={() => {}}
                setOrderChange={() => setOrderDataChange}
                onClose={onClose}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
