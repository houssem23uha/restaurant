import { useItems } from "./hooks/items/useItems";
import styles from "./Menu.module.scss";
import Recipe from "./recipe";
import SliderTabs from "./SliderTabs";
import { useState } from "react";

function Menu() {
  const { data: items, isLoading, error } = useItems();

  const [filter, setFilter] = useState<string>("");

  if (isLoading) return <p>Chargement...</p>;
  if (error instanceof Error) return <p>Erreur : {error.message}</p>;

  // Appliquer le filtre (ex: par catégorie, type, etc.)
  const filteredItems = filter
    ? items.filter((item) => item.category === filter) // adapte ce champ
    : items;

  return (
    <>
      <div className={`${styles.MenuContent}`}>
        <div
          className={`${styles.MenuTitle} d-flex justify-content-center mb-3 page-title`}
        >
          <h1>Menu</h1>
        </div>

        <div className="row d-flex flex-column gap-3 mb-3">
          <SliderTabs onFilterChange={setFilter} />
        </div>

        <div className="grid my-5">
          {filteredItems.map((item) => (
            <Recipe key={item.ref} vote={false} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Menu;
