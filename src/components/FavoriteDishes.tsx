import {  useState } from "react";
import styles from "./Menu.module.scss";
import { useItems } from "./hooks/items/useItems";
import SliderTabs from "./SliderTabs";
import Recipe from "./recipe";
import type { Item } from "./types";
import { useUpdateCustomerFavorites } from "./hooks/customers/useCustomerMutations";
import { useCustomer } from "./CustomerContext";

function FavoriteDishes() {
  const { data: items, isLoading, error } = useItems();
  const { customer, setCustomer } = useCustomer(); // 🔥 1. Accès au customer
  const [filter, setFilter] = useState<string>("");
<<<<<<< Updated upstream
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
=======

  const updateFavorites = useUpdateCustomerFavorites();

  // 🔥 2. Appliquer filtre + garder que les favoris
  const favoriteItems = items?.filter((item) =>
    customer?.items?.some((fav) => fav.ref === item.ref)
  );

  const filteredItems = filter
    ? favoriteItems?.filter((item) => item.category === filter)
    : favoriteItems;

  // 🔥 3. Retirer des favoris
  const handleToggleFavorite = (item: Item) => {
    const updatedFavorites = customer.items.filter((fav) => fav.ref !== item.ref);

    updateFavorites.mutate(
      { ...customer, items: updatedFavorites },
      {
        onSuccess: (updatedCustomer) => {
          setCustomer(updatedCustomer); // Mise à jour du contexte
        },
      }
    );
  };

  if (isLoading) return <p>Chargement...</p>;
  if (error instanceof Error) return <p>Erreur : {error.message}</p>;

  return (
    <div className={styles.MenuContent}>
      <div className={`${styles.MenuTitle} page-title d-flex justify-content-center mb-3`}>
        <h1>Plats favoris</h1>
      </div>

      <div className="row d-flex flex-column gap-3 mb-3">
        <SliderTabs onFilterChange={setFilter} />
      </div>

      {filteredItems?.length === 0 ? (
        <p className="text-center">Aucun plat favori trouvé.</p>
      ) : (
        <div className="grid my-5">
          {filteredItems.map((item) => (
            <Recipe
              key={item.ref}
              item={item}
              vote={true}
              onRate={() => {}}
              onToggleFavorite={() => handleToggleFavorite(item)} // 🔥 clique sur le coeur
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
>>>>>>> Stashed changes
  );
}

export default FavoriteDishes;
