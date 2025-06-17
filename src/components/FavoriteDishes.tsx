import { useEffect, useState } from "react";
import styles from "./Menu.module.scss";
import { useItems } from "./hooks/items/useItems";
import SliderTabs from "./SliderTabs";
import Recipe from "./recipe";
import type { Item } from "./types";
import { useUpdateItem } from "./hooks/items/useItemMutations";

function FavoriteDishes() {
  const { data: items, isLoading, error } = useItems();
  const [localItems, setLocalItems] = useState<Item[]>([]);
  const [filter, setFilter] = useState<string>("");
  const onSuccess = (ref) => {
    setLocalItems((prevItems) =>
        prevItems.map((item) =>
            item.ref === ref ? { ...item, version: item.version + 1 } : item
        )
    );
  };

  useEffect(() => {
    if (items) {
      setLocalItems(items);
    }
  }, [items]);

  const updateMutation = useUpdateItem();

  const handleRate = (updatedItem: Item) => {
    setLocalItems((prevItems) =>
        prevItems.map((item) =>
            item.ref === updatedItem.ref
                ? { ...item, rate: updatedItem.rate }
                : item
        )
    );
    updateMutation.mutate(updatedItem, {
      onSuccess: () => onSuccess && onSuccess(updatedItem.ref),
    });
  };

  if (isLoading) return <p>Chargement...</p>;
  if (error instanceof Error) return <p>Erreur : {error.message}</p>;

  // Appliquer le filtre (ex: par catégorie, type, etc.)
  const filteredItems = filter
      ? localItems.filter((item) => item.category === filter) // adapte ce champ
      : items;

  return (
      <>
        {filteredItems?.map((item: Item, index) => (
            <li key={index}>
              Name: {item.name}, Rate: {item.rate}, Number of Rates: {item.nbRate},
              Version: {item.version}
            </li>
        ))}
        <div className={`${styles.MenuContent}`}>
          <div
              className={`${styles.MenuTitle} page-title d-flex justify-content-center mb-3`}
          >
            <h1>Plats favoris</h1>
          </div>

          <div className="row d-flex flex-column gap-3 mb-3">
            <SliderTabs onFilterChange={setFilter} />
          </div>

          <div className="grid my-5">
            {filteredItems.map((item) => (
                <Recipe
                    key={item.ref}
                    vote={true}
                    item={item}
                    onRate={handleRate}
                />
            ))}
          </div>
        </div>
      </>
  );
}

export default FavoriteDishes;
