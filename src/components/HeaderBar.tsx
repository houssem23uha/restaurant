import styles from "./HeaderBar.module.scss";

function HeaderBar() {
  return (
    <div
      className={`${styles.headerContainer} flex-fill d-flex flex-row align-items-center ms-3 me-3 gap-4`}
    >
      <span className="separator"></span>
      <a href="#" className="logo logo-primary">
        <i className="fa-solid fa-utensils"></i>
        <span className="ms-3">GROUPE2</span>
      </a>
      <form className=" flex-fill d-flex flex-row align-items-center m-2 p-2 gap-2">
        <button type="submit" className="btn btn-reverse-primary border-0">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
        <label htmlFor="search" className="">
          <strong>Je cherche</strong>
        </label>
        <input
          type="text"
          placeholder="Une recette, un ingrédient..."
          className="flex-fill "
        />
        <button type="submit" className="btn btn-primary">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      <span className="separator"></span>

      <button className="btn btn-reverse-primary ">
        <i className="fa-solid fa-basket-shopping "></i>
      </button>
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
