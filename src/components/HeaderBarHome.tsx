import styles from "./HeaderBarHome.module.scss";
import logo from "/src/assets/images/logo.png";
import { useNavigate } from 'react-router-dom';


function HeaderBarHome() {
   const navigate = useNavigate();
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
        <button className=" btn btn-reverse-primary d-flex dlex-row align-items-center gap-2"
        onClick={() => navigate('/carte')}
        >
        <i className="fa-solid  mr-2"></i>
        <span className="ml-2">Carte</span>
      </button>

     <button className=" btn btn-reverse-primary d-flex dlex-row align-items-center gap-2"
      onClick={() => navigate('/reservation')}>
        <i className="fa-solid  mr-2"></i>
        <span className="ml-2">Reservation</span>
      </button>
      <button className=" btn btn-reverse-primary d-flex dlex-row align-items-center gap-2"
      onClick={() => navigate('/commande')}>
        <i className="fa-solid  mr-2"></i>
        <span className="ml-2">Commande</span>
      </button>


      <button className=" btn btn-reverse-primary " style={{ marginLeft: 'auto' }}
      onClick={() => navigate('/connexion')}>
        <i className="fa-solid fa-right-to-bracket mr-2"></i>
        <span className="ml-2">Connexion</span>
      </button>
    </div>
  );
}
export default HeaderBarHome;
