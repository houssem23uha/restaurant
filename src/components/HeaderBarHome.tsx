import styles from "./HeaderBarHome.module.scss";
import logo from "/src/assets/images/logo.png";
import { useNavigate } from 'react-router-dom';
import { useCustomer } from "./CustomerContext";

function HeaderBarHome() {
  const navigate = useNavigate();
   const { customer, photo, logout } = useCustomer();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div
      className={`${styles.headerContainer} flex-fill d-flex flex-row align-items-center ms-3 me-3 gap-4`}
    >
      <span className="separator"></span>

      <img
        src={logo}
        alt="Logo"
        style={{ maxWidth: '5%', maxHeight: '5%' }}
      />

      <button
        className="btn btn-reverse-primary d-flex dlex-row align-items-center gap-2"
        onClick={() => navigate('/carte')}
      >
        <span className="ml-2">Carte</span>
      </button>

      <button
        className="btn btn-reverse-primary d-flex dlex-row align-items-center gap-2"
        onClick={() => navigate('/reservation')}
      >
        <span className="ml-2">Réservation</span>
      </button>

      <button
        className="btn btn-reverse-primary d-flex dlex-row align-items-center gap-2"
        onClick={() => navigate('/commande')}
      >
        <span className="ml-2">Commande</span>
      </button>

      {customer ? (
        <>
          <button
            className="btn btn-reverse-primary"
            onClick={() => navigate('/panier')}
          >
            🛒 Panier
          </button>


              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "1rem" }}>
        {customer && (
          <>
            <span style={{ fontWeight: "bold" }}>{customer.firstname}</span>
            {photo && (
              <img
                src={photo}
                alt="Profil"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #ccc",
                }}
              />
            )}

            <button
            className="btn btn-reverse-primary"
            onClick={() => navigate('/account')}
          >
            Compte
          </button>
            <button
            className="btn btn-danger"
            onClick={handleLogout}
            style={{ marginLeft: "auto" }}
          >
            <i className="fa-solid fa-right-from-bracket mr-2"></i>
            <span className="ml-2">Déconnexion</span>
          </button>
          </>
        )}
      </div>




          
        </>
      ) : (
        <button
          className="btn btn-reverse-primary"
          style={{ marginLeft: 'auto' }}
          onClick={() => navigate('/login')}
        >
          <i className="fa-solid fa-right-to-bracket mr-2"></i>
          <span className="ml-2">Connexion</span>
        </button>
      )}
    </div>
  );
}

export default HeaderBarHome;
