import { useState } from "react";
import styles from "./HeaderBar.module.scss";
import GenericModal from "./GenericModal";
import Basket from "./Basket";

function HeaderBar() {
  const [showPanier, setShowPanier] = useState(false);
  return (
      <div
          className={`${styles.headerContainer} flex-fill d-flex flex-row align-items-center ms-3 me-3 gap-4`}
      >
        <span className="separator"></span>
        <a href="#" className="logo logo-primary">
          <i className="fa-solid fa-utensils"></i>
          <span className="ms-3">GROUPE2</span>
        </a>
        <span className="separator"></span>

        <button
            className="btn btn-reverse-primary "
            onClick={() => setShowPanier(true)}
        >
          <i className="fa-solid fa-basket-shopping "></i>
        </button>
        {showPanier && (
            <GenericModal
                show={showPanier}
                showHeader={true}
                onClose={() => setShowPanier(false)}
                title="Mon panier"
                placement="start"
            >
              <Basket client={undefined} />
            </GenericModal>
        )}
        <button className=" btn btn-reverse-primary d-flex dlex-row align-items-center gap-2">
          <i className="fa-solid fa-right-to-bracket mr-2"></i>
          <span className="ml-2">Connexion</span>
        </button>
        <button className=" btn btn-primary d-flex dlex-row align-items-center gap-2">
          <i className="fa-solid fa-user-plus"></i>
          <span className="ml-2">Inscription</span>
        </button>
      </div>
  );
}
export default HeaderBar;
