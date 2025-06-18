import { useItems } from "./hooks/items/useItems";
import styles from "./Menu.module.scss";
import Recipe from "./recipe";
import SliderTabs from "./SliderTabs";
import { useState } from "react";
import { useCustomer } from "./CustomerContext"; // pour accéder au client connecté
import { useUpdateCustomerFavorites } from "./hooks/customers/useCustomerMutations"; // hook à créer si pas encore fait


function Menu() {
  const { data: items, isLoading, error } = useItems();
  const { customer, setCustomer } = useCustomer(); // accès au client connecté
  const updateFavoritesMutation = useUpdateCustomerFavorites(); // hook mutation
  const [filter, setFilter] = useState<string>("");

  

  if (isLoading) return <p>Chargement...</p>;
  if (error instanceof Error) return <p>Erreur : {error.message}</p>;

  // Appliquer le filtre (ex: par catégorie, type, etc.)
  const filteredItems = filter
    ? items.filter((item) => item.category === filter) // adapte ce champ
    : items;
  console.log("filteredItems", filteredItems); // Debug

   const handleToggleFavorite = (item) => {
  if (!customer) return;
  console.log("handleToggleFavorite called with customer:", customer);
  console.log("item", item);

  const existingItems = customer.items ?? [];
  const isAlready = existingItems.some((i) => i.ref === item.ref);
  console.log("isAlready", isAlready);

  // Toujours envoyer uniquement les `ref`
  const updatedItems = isAlready
    ? existingItems.filter((i) => i.ref !== item.ref).map((i) => ({ ref: i.ref }))
    : [...existingItems.map((i) => ({ ref: i.ref })), { ref: item.ref }];

  const updatedCustomer = {
    ...customer,
    items: updatedItems,
    version: customer.version, // Ne pas toucher à la version ici
  };

  console.log("updatedCustomer", updatedCustomer);

  updateFavoritesMutation.mutate(updatedCustomer, {
    onSuccess: (serverUpdatedCustomer) => {
      // ⚠️ Remplacer localement par la version renvoyée du serveur
      setCustomer(serverUpdatedCustomer); 
    },
  });
};


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
            <Recipe
             key={item.ref}
              vote={false}
              item={item}
              onRate={() => {}}
              isFavorite={(customer.items ?? []).some((i) => i.ref === item.ref)}
              onToggleFavorite={() => handleToggleFavorite(item)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Menu;
