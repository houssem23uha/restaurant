import { useItems } from "./hooks/items/useItems";
import type { Item } from "./types";
/* import styles from "./Menu.module.scss";
import Recipe from "./recipe";
import SliderTabs from "./SliderTabs"; */

function Menu() {
  const { data: items, isLoading, error } = useItems();

  if (isLoading) return <p>Chargement...</p>;
  if (error instanceof Error) return <p>Erreur : {error.message}</p>;
  console.log(items);

  return (
    <>
      <ol>
        {items?.map((item: Item) => (
          <li>{item.name}</li>
        ))}
      </ol>
      {/*       <div className={`${styles.MenuContent}`}>
        <div
          className={`${styles.MenuTitle} d-flex justify-content-center mb-3 page-title`}
        >
          <h1>Menu</h1>
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
      </div> */}
    </>
  );
}

export default Menu;
