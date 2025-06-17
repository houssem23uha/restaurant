import styles from "./MenuModal.module.scss";

export default function MenuModal({ children }) {
  return (
    <div>
      <div
        className="modal show fade d-block"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <div className={`modal-dialog ${styles.customModal}`} role="document">
          <div className={`modal-content border-0 ${styles.noRadius}`}>
            <div className="row justify-content-center mt-3">
              <ul className="col-auto border-end d-flex flex-column align-items-start gap-2">
                <li>
                  <a href="/menu">Menu</a>
                </li>
                <li>
                  <a href="/orders">Commandes</a>
                </li>
                <li>
                  <a href="/reservation">Réservations</a>
                </li>
                <li>
                  <a href="/account">Mon compte</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
                {/* Tu peux ajouter ici d'autres liens librement */}
              </ul>
              {/* Zone libre à droite si besoin */}
              <div className="col">{children}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );
}
