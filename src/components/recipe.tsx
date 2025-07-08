import styles from "./Recipe.module.scss";
import StarRating from "./StarRating";
import StarRatingVote from "./StarRatingVote";
import defaultImage from "../assets/images/default.jpg";
import { capitalizeFirstLetter } from "../utils/helpers";
import GenericModal from "./GenericModal";
import Basket from "./Basket";
import { useState } from "react";
import { useCustomer } from "./CustomerContext";
import { useCustomerwithOrdersLines } from "./hooks/customers/useCustomer";
import { useCreateOrderLine } from "./hooks/OrderLines.ts/OrderLinesMutation";



function Recipe({ vote, item, onRate, onToggleFavorite, isFavorite }) {
  const [nouvelleLigne, setNouvelleLigne] = useState(null);
  const [showPanier, setShowPanier] = useState(false);
  const { customer: customerContext } = useCustomer();
  const { data: customer, isLoading, error, refetch } = useCustomerwithOrdersLines(customerContext?.id);
  const { setOrder  } = useCustomer();
  const { order } = useCustomer();


  const createOrderLineMutation = useCreateOrderLine();





  const handleRate = (newRate) => {
    item.rate = newRate;
    if (onRate) onRate(item);
  };

 const handleAdd = () => {
  if (!item || !item.price) return;

  const ligne = {
    quantity: 1,
    line_price: item.price,
    item: item,
    order: order ? { id: order.id } : null,
  };

  setNouvelleLigne(ligne);

  createOrderLineMutation.mutate(ligne, {
    onSuccess: (createdLine) => {
      // on récupère la commande actuelle (order)
      if (!order) return; // sécurité

      // On ajoute la nouvelle ligne complète
        const fullOrderLines = [...(order.order_lines || []), createdLine];

        // On mappe pour ne garder que les champs voulus
        const newOrderLines = fullOrderLines.map(line => ({
          id: line.id,
          quantity: line.quantity,
          line_price: line.line_price,
          version: line.version,
          item: {
            ref: line.item.ref,
            price: line.item.price,
            name: line.item.name,
          }
        }));

      // on met à jour le total (optionnel)
      const newTotalPrice = newOrderLines.reduce((sum, ol) => sum + ol.line_price * ol.quantity, 0);

      // on construit la nouvelle commande modifiée localement
      const updatedOrder = {
        ...order,
        order_lines: newOrderLines,
        totalPrice: newTotalPrice,
      };

      // on met à jour dans le contexte (local)
      setOrder(updatedOrder);
    },
    onError: (error) => {
      console.error("Erreur création ligne de commande:", error);
    },
  });

 

  console.log(" Je suis dans Receipe.tsx, handleAdd Ligne de commande créée :", ligne);
  console.log("Je suis dans Receipe.tsx, handleAdd Commande actuelle :", order);
  

  setShowPanier(true);
};

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div className={`${styles.recipeCard}`}>
      <div className={`${styles.imageContainer} position-relative`}>
        {onToggleFavorite && (
          <button
            className="heart-circle btn position-absolute top-0 end-0 z-1 m-4"
            onClick={onToggleFavorite}
            style={{ background: "transparent", border: "none" }}
          >
            <i
              className={`fa-${isFavorite ? "solid" : "regular"} fa-heart fa-2x`}
              style={{ color: isFavorite ? "red" : "#ccc" }}
            ></i>
          </button>
        )}

        <img
          className="z-0"
          src={`public/assets/images/items/${item.pathImg}.jpg`}
          alt={item.name}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = defaultImage;
          }}
        />

        <span className="label position-absolute bottom-0 start-0 z-2 m-3 px-2">
          {capitalizeFirstLetter(item.category)}
        </span>
      </div>

      <div className="d-flex align-items-center">
        <div
          className={`${styles.recipeCardInfo} flex-fill d-flex flex-column justify-content-center align-items-start mt-2`}
        >
          <div className={`${styles.title}`}>
            {capitalizeFirstLetter(item.name)}
          </div>
          {vote ? (
            <StarRatingVote rating={item.rate} onRate={handleRate} />
          ) : (
            <StarRating rating={item.rate} reviews={item.nbRate} />
          )}
        </div>

        <button className="m-3 px-2" onClick={handleAdd}>
          <i className="fa-solid fa-cart-shopping fa fa-2x"></i>
          <i className="fa-solid fa-plus fa fa-xs"></i>
        </button>

        {showPanier && nouvelleLigne && (
          <GenericModal
            show={showPanier}
            showHeader={true}
            onClose={() => setShowPanier(false)}
            title="Mon panier"
            placement="start"
          >
            {/* ⚠️ On passe `customer` (avec ses orders/lines) et la ligne à ajouter */}
            <Basket client={customer} nouvelleLigne={nouvelleLigne} />
          </GenericModal>
        )}
      </div>
    </div>
  );
}

export default Recipe;
