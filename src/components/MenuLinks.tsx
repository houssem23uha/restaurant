import React from "react";
import { Link } from "react-router-dom";
import styles from "./MenuLinks.module.scss";

interface MenuLinksProps {
  show: boolean;
  onClose: () => void;
}

const MenuLinks: React.FC<MenuLinksProps> = ({ show, onClose }) => {
  if (!show) return null;

  const links = [
    { label: "Compte", path: "/account" },
    { label: "Mes Réservations", path: "/mesreservations" },
    { label: "Mes Commandes", path: "/orders" },
    { label: "Mes Favoris", path: "/account/favoris" },
  ];

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={styles.modal}>
        <div className={styles.menuLinksContainer}>
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={styles.labelLink}
              onClick={onClose}
            >
              <ul>
                <li>
                  <h3>{link.label}</h3>
                 
                </li>
              </ul>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default MenuLinks;
