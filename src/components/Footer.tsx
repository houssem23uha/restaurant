import styles from "./Footer.module.scss";

function Footer() {
  const ingredients = ["poires", "fraises", "mûres", "endives", "betteraves"];
  const ustensiles = ["Cookeo", "Thermomix", "Airfryer", "Monsieur Cuisine"];
  const topRecettes = [
    "Gigot d'agneau à l'ail et au romarin",
    "Lapin à la moutarde",
    "Filet mignon de porc rôti à la moutarde",
    "Beignets aux pommes",
    "Salade de fruits frais",
  ];

  const thematiques = [
    "Recettes Pâques 2025",
    "Plats de pâques",
    "Desserts de pâques",
    "Chocolats de pâques",
  ];
  // Fonction utilitaire pour transformer les noms en URLs valides (ex : "mûres" → "mures")
  const slugify = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/\s+/g, "-");

  return (
    <div className={`${styles.footer} px-4`}>
      <div className="container text-center">
        <div className="row justify-content-center">
          <a
            href="#"
            className={`${styles.goToTop} d-flex flex-row align-items-center justify-content-center position-absolute `}
          >
            <i className="fa-solid fa-arrow-up fa-lg"></i>
          </a>
        </div>
        <div className="row justify-content-center mt-3">
          <a href="#" className="logo logo-reverse-primary position-relative">
            <i className="fa-solid fa-utensils"></i>
            <span className="ms-3">GROUPE2</span>
          </a>
        </div>
        <div
          className={`${styles.footerContainer} row justify-content-center mt-3`}
        >
          <ul className="col-auto border-end d-flex flex-column align-items-start">
            <li>
              <strong>Recettes par Ingrédient</strong>
            </li>
            {ingredients.map((item) => (
              <li key={item}>
                <a href={`/recettes/${slugify(item)}`}>Recettes avec {item}</a>
              </li>
            ))}
          </ul>
          <ul className="col-auto border-end d-flex flex-column align-items-start ">
            <li>
              <strong>Recettes par Ustensile</strong>
            </li>
            {ustensiles.map((item) => (
              <li key={item}>
                <a href={`/recettes/${slugify(item)}`}>Recettes au {item}</a>
              </li>
            ))}
          </ul>
          <ul className="col-auto border-end d-flex flex-column align-items-start">
            <li>
              <strong>Top Recettes</strong>
            </li>
            {topRecettes.map((recipe) => (
              <li key={recipe}>
                <a href={`/recettes/${slugify(recipe)}`}>{recipe}</a>
              </li>
            ))}
          </ul>
          <ul className="col-auto d-flex flex-column align-items-start">
            <li>
              <strong>Thématiques du moment</strong>
            </li>
            {thematiques.map((theme) => (
              <li key={theme}>
                <a href={`/recettes/${slugify(theme)}`}>{theme}</a>
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`${styles.footerBottom} row justify-content-between mt-3 py-3`}
        >
          <div className="col-4 d-flex justify-content-start">
            <p>Copyright © 2025 Cookchef GroupeG2, Inc.</p>
          </div>
          <div className="col-4 d-flex justify-content-end">
            <ul
              className={`${styles.socialMedia} d-flex flex-row align-items-center gap-3 m-0 p-0`}
            >
              <li>
                <a href="#" aria-label="Instagram">
                  <i className="fa-brands fa-instagram fa-2x"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-facebook fa-2x"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-tiktok fa-2x"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fa-brands fa-youtube fa-2x"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
