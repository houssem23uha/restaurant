
import styles from "./Header.module.scss";
import HeaderBarHome from "./HeaderBarHome";
import MenuLinks from "./MenuLinks";
import { useState } from "react";
function HeaderContent() {
    const [showModal, setModalOpen] = useState(false);
  

  return (
    <div className={`${styles.headerScrolled} d-flex flex-column mb-3`}>
      <div className="row">
        <div className="col d-flex flex-row align-items-center ms-3">
          <i
        className="fa-solid fa-bars fa-3x"
        onClick={() => setModalOpen(!showModal)}
        style={{ cursor: "pointer" }}
        ></i>

          <HeaderBarHome />
        </div>
      </div>

     {showModal && (
    <MenuLinks show={showModal} onClose={() => setModalOpen(false)} />
    )}
    </div>
  );
}

export default HeaderContent;
