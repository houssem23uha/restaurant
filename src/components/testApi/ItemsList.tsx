import React from "react";
import { useItems } from "../hooks/items/useItems";
import { useDeleteItem } from "../hooks/items/useItemMutations";

const ItemsList: React.FC = () => {
  const { data: items, isLoading, error } = useItems();
  const deleteMutation = useDeleteItem();

  if (isLoading) return <p>Chargement...</p>;
  if (error instanceof Error) return <p>Erreur : {error.message}</p>;

  const handleDelete = (id: number) => {
    if (window.confirm("Supprimer cet item ?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
      <ul>
        {items?.map((item) => (
            <li key={item.ref}>
              {item.name}
              <button
                  onClick={() => handleDelete(item.ref)}
                  disabled={deleteMutation.isPending}
              >
                Supprimer
              </button>
              {/* Tu peux aussi ajouter un bouton "Modifier" ici */}
            </li>
        ))}
      </ul>
  );
};

export default ItemsList;
