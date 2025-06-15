import styles from './Carte.module.scss';
import React, { useEffect, useState } from "react";
import type { Item } from "./models/Item";
import { getItems } from "./services/itemService";



const categories = ["Starter", "Main", "Dessert", "Drink"];




function Carte() {

const [items, setItems] = useState<Item[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string>("");

   useEffect(() => {
      getItems()
        .then(data => setItems(data))
        .catch(e => setError(e.message))
        .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;
  


  return (
    <div className={styles.carteContainer}>
        <h1 className={styles.menuTitle}>La Carte</h1>
      {categories.map((category) => (
        <div key={category} className={styles.categorySection}>
          <h2 className={styles.categoryTitle}>{category}</h2>
          <div className={styles.cardsWrapper}>
            {items
              .filter(item => item.category.toLowerCase() === category.toLowerCase())
              .map(item => (
                <div key={item.ref} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className={styles.name}>{item.name}</span>
                    <span className={styles.price}>{item.price}</span>
                  </div>
                  <p className={styles.description}>{item.description}</p>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Carte;
