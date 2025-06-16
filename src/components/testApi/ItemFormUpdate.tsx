import React, { useEffect, useState } from "react";
import type { Item, Ingredient, OrderLine } from "../types";
import { useUpdateItem } from "../hooks/items/useItemMutations";
import { useParams } from "react-router-dom";
import { useItem } from "../hooks/items/useItem";

const ItemFormUpdate = () => {
    const { id } = useParams();
    const { data: item } = useItem(Number(id));
    const [ref, setRef] = useState(0);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [pathImg, setPathImg] = useState("");
    const [rate, setRate] = useState(0);
    const [nbRate, setNbRate] = useState(0);
    const [category, setCategory] = useState("");
    const [order_lines, setOrderLines] = useState<OrderLine[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [version, setVersion] = useState(0);
    const onSuccess = () => {
        setVersion(version + 1);
    };

    useEffect(() => {
        if (item) {
            console.log("Item loaded:", item);
            setRef(item.ref);
            setName(item.name);
            setPrice(item.price);
            setDescription(item.description);
            setPathImg(item.pathImg);
            setRate(item.rate);
            setNbRate(item.nbRate);
            setCategory(item.category);
            setOrderLines(item.order_lines);
            setIngredients(item.ingredients);
            setVersion(item.version);
        }
    }, [item]);

    const updateMutation = useUpdateItem();

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

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (!item) return;
        const itemData = getItemData();
        updateMutation.mutate(
            { ...item, ...itemData },
            {
                onSuccess: () => onSuccess && onSuccess(),
            }
        );
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

            <button
                type="button"
                onClick={handleUpdate}
                disabled={updateMutation.isPending}
            >
                Mettre à jour
            </button>
        </form>
    );
};

export default ItemFormUpdate;
