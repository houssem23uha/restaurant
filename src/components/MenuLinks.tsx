import React from "react";
import { Link } from "react-router-dom";
import styles from "./MenuLinks.module.scss";
import { useCustomer } from "./CustomerContext";

interface MenuLinksProps {
  show: boolean;
  onClose: () => void;
}

const MenuLinks: React.FC<MenuLinksProps> = ({ show, onClose }) => {
  const { customer } = useCustomer();

  if (!show || !customer) return null;

  const links = [
    { label: "Mon Compte", path: "/account", icon: "fa-user" },
    { label: "Mes Réservations", path: "/mesreservations", icon: "fa-calendar-check" },
    { label: "Mes Commandes", path: "/orders", icon: "fa-receipt" },
    { label: "Mes Favoris", path: "/account/favoris", icon: "fa-heart" },
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
                  <i className={`fa-solid ${link.icon}`}></i>
                  <span>{link.label}</span>
                </Link>
            ))}
          </div>
        </div>
      </>
  );
};

export default MenuLinks;
