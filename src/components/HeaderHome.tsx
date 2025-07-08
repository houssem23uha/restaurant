import { useState,useEffect } from "react";
import styles from "./Header.module.scss";
import HeaderBarHome from "./HeaderBarHome";
import MenuLinks from "./MenuLinks";

function HeaderHome() {
    const [scrolled, setScrolled] = useState(false);
    const [showModal, setModalOpen] = useState(false);

    // Gestion de changement de couleur du header après le scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 800);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`${styles.header} ${scrolled ? styles.headerScrolled : ""} d-flex flex-column mb-3`}>
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

export default HeaderHome;
