import styles from "./HeaderBarHome.module.scss";
import logo from "/src/assets/images/logo.png";
import { useNavigate } from 'react-router-dom';
import { useCustomer } from "./CustomerContext";
import GenericModal from "./GenericModal";
import Basket from "./Basket";
import { useState, useEffect} from "react";
import { useCustomerswithOrdersLines } from "./hooks/customers/useCustomers";



function HeaderBarHome() {


  const [showPanier, setShowPanier] = useState(false);
   
  const navigate = useNavigate();
  const { customer, photo, logout } = useCustomer();
  const [customerOrderLine, setCustomerOrderLine] = useState(null);

    // Hook pour récupérer les clients avec leurs lignes de commande
    // const { data: customers, isLoading, error } = useCustomerswithOrdersLines();
  const { data: customers } = useCustomerswithOrdersLines();

    useEffect(() => {
      if (customers && customers.length > 0) {
        const cust = customers.find((c) => c.id === 1) || null;
        setCustomerOrderLine(cust);
      }
      console.log("Customer -->" + customer)
      console.log("CustomerOrderLine -->" +customerOrderLine)
    }, [customers]);

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
          <span className="ml-2">Réserver</span>
        </button>

        <button
            className="btn btn-reverse-primary d-flex dlex-row align-items-center gap-2"
            onClick={() => navigate('/menu')}
        >
          <span className="ml-2">Commander</span>
        </button>




        {customer ? (
            <>
             <>
 
 
    <button
      className="btn-reverse-primary d-flex align-items-center"
      onClick={() => setShowPanier(true)}
    >
      <i className="fa-solid fa-basket-shopping fa-lg me-2"></i>
      Panier
    </button>
    {showPanier && (
      <GenericModal
        show={showPanier}
        showHeader={true}
        onClose={() => setShowPanier(false)}
        title="Mon panier"
        placement="start"
      >
        <Basket client={customerOrderLine} />
      </GenericModal>
    )}
 
</>

              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "1rem" }}>
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
                    className="btn btn-reverse-primary"
                    onClick={() => navigate("/mesreservations")}
                >
                  Mes Réservations
                </button>
                <button
                    className="btn btn-reverse-primary"
                    onClick={() => navigate("/orders")}
                >
                  Mes Commandes
                </button>
                <button
                    className="btn btn-reverse-primary"
                    onClick={() => navigate("/account/favoris")}
                >
                  Mes Favoris
                </button>

                <button
                    className="btn btn-reverse-primary"
                    onClick={handleLogout}
                    style={{ marginLeft: "auto" }}
                >
                  <i className="fa-solid fa-right-from-bracket mr-2"></i>
                  <span className="ml-2">Déconnexion</span>
                </button>
              </div>
            </>
        ) : (
            <button
                className="btn btn-reverse-primary"
                style={{ marginLeft: 'auto' }}
                onClick={() => navigate('/login')}
            >
              <i className="fa-solid fa-right-to-bracket mr-2"></i>
              <span className="ml-2">Se connecter</span>
            </button>
        )}
      </div>
  );
}

export default HeaderBarHome;
