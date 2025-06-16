import { useState,useEffect } from "react";
import styles from "./Header.module.scss";
import MenuModal from "./MenuModal";
import HeaderBarHome from "./HeaderBarHome";

/* import MenuModal from "./MenuModal";
 */
function HeaderHome() {
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setModalOpen] = useState(false);

  // Gestion de changement de couleur du header apres le scroll
   useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 800) {  //Taille de l'ecran
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
//--


  return (
    <div className={`${styles.header} ${scrolled ? styles.headerScrolled : ""} d-flex flex-column mb-3`}>
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
      

    </div>
  );
}

export default HeaderHome;
