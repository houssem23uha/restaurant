import { useItem } from "../hooks/items/useItem";
import { useParams } from "react-router-dom";

const ItemDetails = () => {
  const { id } = useParams();
  const { data: item, isLoading, error } = useItem(Number(id));

  if (isLoading) return <p>Chargement...</p>;
  if (error instanceof Error) return <p>Erreur : {error.message}</p>;

  if (!item) return <p>Item non trouvé</p>;

  return (
    <div>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      {/* Autres infos ici */}
    </div>
  );
};

export default ItemDetails;
