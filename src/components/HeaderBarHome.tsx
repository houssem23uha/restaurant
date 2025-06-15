import styles from "./HeaderBarHome.module.scss";
import logo from "/src/assets/images/logo.png";


function HeaderBarHome() {
  return (
    <div
      className={`${styles.headerContainer} flex-fill d-flex flex-row align-items-center ms-3 me-3 gap-4`}
    >
      <span className="separator"></span>
      <img
          src={logo}// ton logo dans /public/logo.png
          alt="Logo"
          style={{ maxWidth: '5%', maxHeight: '5%' }}
        />
        <button className=" btn btn-reverse-primary d-flex dlex-row align-items-center gap-2">
        <i className="fa-solid  mr-2"></i>
        <span className="ml-2">Carte</span>
      </button>

     <button className=" btn btn-reverse-primary d-flex dlex-row align-items-center gap-2">
        <i className="fa-solid  mr-2"></i>
        <span className="ml-2">Reservation</span>
      </button>
      <button className=" btn btn-reverse-primary d-flex dlex-row align-items-center gap-2">
        <i className="fa-solid   mr-2"></i>
        <span className="ml-2">Commande</span>
      </button>

      <button className="btn btn-reverse-primary " style={{ marginLeft: 'auto' }}>
        <i className="fa-solid fa-basket-shopping "></i>
      </button>
      <button className=" btn btn-reverse-primary d-flex dlex-row align-items-center gap-2" >
        <i className="fa-solid fa-right-to-bracket mr-2"></i>
        <span className="ml-2">Connexion</span>
      </button>
    </div>
  );
}
export default HeaderBarHome;
