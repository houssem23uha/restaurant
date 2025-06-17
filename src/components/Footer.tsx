import styles from "./Footer.module.scss";

function Footer() {
  return (
      <footer className={styles.footer}>
        <div className={`${styles.footerContainer} container`}>
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 text-center">
              <h5>Restaurant Le Cercle</h5>
              <p>
                Le Cercle, restaurant de cuisine française raffinée, vous accueille
                dans une ambiance chaleureuse et élégante pour vous faire découvrir
                des saveurs authentiques et créatives.
              </p>
              <p>📍 12 Rue des Gourmets, 75001 Paris, France</p>
              <p>📞 +33 1 23 45 67 89</p>
              <p>📧 contact@restaurant-lecercle.fr</p>
            </div>

            <div className="col-12 mt-3">
              <ul className={styles.socialMedia}>
                <li>
                  <a
                      href="https://www.instagram.com/restaurantlecercle"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                  >
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
                <li>
                  <a
                      href="https://www.facebook.com/restaurantlecercle"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                  >
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a
                      href="https://www.tiktok.com/@restaurantlecercle"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                  >
                    <i className="fa-brands fa-tiktok"></i>
                  </a>
                </li>
                <li>
                  <a
                      href="https://www.youtube.com/@restaurantlecercle"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                  >
                    <i className="fa-brands fa-youtube"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div className={`${styles.footerBottom} col-12 mt-3`}>
              <small>© 2025 Restaurant Le Cercle – Tous droits réservés.</small>
            </div>
          </div>
        </div>
      </footer>
  );
}

export default Footer;
