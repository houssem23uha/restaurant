import styles from "./MenuModal.module.scss";

export default function MenuModal({ children }) {
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
    <div>
      <div
        className="modal show fade d-block"
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
      >
        <div className={`modal-dialog ${styles.customModal} `} role="document">
          <div className={`modal-content border-0 ${styles.noRadius}`}>
            <div className="modal-body p-0">
              <div className={`${styles.header} d-flex flex-column mb-3`}>
                <div className="row">
                  <div className="col d-flex flex-row align-items-center ms-3">
                    {children}
                  </div>
                </div>
              </div>
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
                    <a href={`/recettes/${slugify(item)}`}>
                      Recettes avec {item}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="col-auto border-end d-flex flex-column align-items-start ">
                <li>
                  <strong>Recettes par Ustensile</strong>
                </li>
                {ustensiles.map((item) => (
                  <li key={item}>
                    <a href={`/recettes/${slugify(item)}`}>
                      Recettes au {item}
                    </a>
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
          </div>
        </div>
      </div>
      {<div className="modal-backdrop fade show"></div>}
    </div>
  );
}
