import React, { useState } from "react";
import type { Item, Ingredient, OrderLine } from "../types";
import { useCreateItem } from "../hooks/items/useItemMutations";

interface Props {
  initialData?: Item;
  onSuccess?: () => void;
}

const ItemForm: React.FC<Props> = ({ initialData, onSuccess }) => {
  const [ref, setRef] = useState(initialData?.ref || 0);
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState(initialData?.price || 0);
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [pathImg, setPathImg] = useState(initialData?.pathImg || "");
  const [rate, setRate] = useState(initialData?.rate || 0);
  const [nbRate, setNbRate] = useState(initialData?.nbRate || 0);
  const [category, setCategory] = useState(initialData?.category || "");
  const [order_lines, setOrderLines] = useState<OrderLine[]>(
    initialData?.order_lines || []
  );
  const [ingredients, setIngredients] = useState<Ingredient[]>(
    initialData?.ingredients || []
  );
  const [version, setVersion] = useState(0);

  const createMutation = useCreateItem();

  const getItemData = (): Item => ({
    ref,
    name,
    price,
    description,
    pathImg,
    rate,
    nbRate,
    category,
    order_lines,
    ingredients,
    version,
  });

  const handleCreate = (e: React.FormEvent) => {
    console.log("create");

    e.preventDefault();
    const itemData = getItemData();
    createMutation.mutate(itemData, {
      onSuccess: () => onSuccess && onSuccess(),
    });
  };

  return (
    <form>
      <div>
        <label>Ref:</label>
        <input
          type="number"
          value={ref}
          onChange={(e) => setRef(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Nom:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Prix:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Image (chemin):</label>
        <input value={pathImg} onChange={(e) => setPathImg(e.target.value)} />
      </div>
      <div>
        <label>Note:</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Nombre de notes:</label>
        <input
          type="number"
          value={nbRate}
          onChange={(e) => setNbRate(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Catégorie:</label>
        <input value={category} onChange={(e) => setCategory(e.target.value)} />
      </div>

      {/* Deux boutons : Créer et Mettre à jour */}
      <button
        type="button"
        onClick={handleCreate}
        disabled={createMutation.isPending}
      >
        Créer
      </button>
    </form>
  );
};

export default ItemForm;
