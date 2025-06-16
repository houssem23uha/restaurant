import { useState } from "react";
import styles from "./Header.module.scss";
import MenuModal from "./MenuModal";
import GenericModal from "./GenericModal";
import Basket from "./Basket";
import HeaderBarHome from "./HeaderBarHome";

function Header() {

  const [showModal, setModalOpen] = useState(false);
  const [showPanier, setShowPanier] = useState(false);


  return (
      <div className={`${styles.headerScrolled}   d-flex flex-column mb-3`}>
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
                  <HeaderBarHome />
                </MenuModal>
            )}
            <HeaderBarHome />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <ul
                className={`${styles.headerNavItem} d-flex flex-row justify-content-center align-items-center ms-3 me-3 gap-4`}
            >
              <span className="separatorSecondary"></span>

              <li>
                <a href="/account/favoris">
                  <i className="fa-solid fa-heart fa-lg me-2"></i>
                  Favories
                </a>
              </li>
              <span className="separatorSecondary"></span>

              <li>
                <a href="#" onClick={() => setShowPanier(true)}>
                  <i className="fa-solid fa-basket-shopping fa-lg me-2"></i>
                  Panier
                </a>
                {showPanier && (
                    <GenericModal
                        show={showPanier}
                        showHeader={true}
                        onClose={() => setShowPanier(false)}
                        title="Mon panier"
                        placement="start"
                    >
                      <Basket />
                    </GenericModal>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
}

export default Header;
