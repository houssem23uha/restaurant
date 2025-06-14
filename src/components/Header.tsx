import { useState } from "react";
import styles from "./Header.module.scss";
import HeaderBar from "./HeaderBar";
import MenuModal from "./MenuModal";
/* import MenuModal from "./MenuModal";
 */
function Header() {
  const [showModal, setModalOpen] = useState(false);

  return (
    <div className={`${styles.header} d-flex flex-column mb-3`}>
      <div className="row">
        <div className="col d-flex flex-row align-items-center ms-3">
          <i
            className="fa-solid fa-bars fa-3x"
            onClick={() => setModalOpen(true)}
          ></i>
          {showModal && (
            <MenuModal>
              <i
                className="fa-solid fa-x fa-3x"
                onClick={() => setModalOpen(false)}
              ></i>
              <HeaderBar />
            </MenuModal>
          )}
          <HeaderBar />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ul
            className={`${styles.headerNav} d-flex flex-row justify-content-center align-items-center ms-3 me-3 gap-4`}
          >
            <li>
              <a href="/reservation">Réservation</a>
            </li>
            <span className="separator"></span>

            <li>
              <a href="#">Menu de la semaine</a>
            </li>
            <span className="separator"></span>

            <li>
              <a href="#">Nos plats</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ul
            className={`${styles.headerNavItem} d-flex flex-row justify-content-center align-items-center ms-3 me-3 gap-4`}
          >
            <li>
              <a href="#">Mieux manger</a>
            </li>
            <span className="separatorSecondary"></span>

            <li>
              <a href="#">
                <i className="fa-solid fa-cocktail fa-lg me-2"></i>
                Apéritif
              </a>
            </li>
            <span className="separatorSecondary"></span>

            <li>
              <a href="#">
                <i className="fa-solid fa-mug-saucer fa-lg me-2"></i>
                Petit-déjeuner & brunch
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
