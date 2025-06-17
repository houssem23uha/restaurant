import { useState } from "react";
import styles from "./Header.module.scss";
import MenuModal from "./MenuModal";
import GenericModal from "./GenericModal";
import Basket from "./Basket";
import { useCustomerswithOrdersLines } from "./hooks/customers/useCustomers";
/* import { useCustomerswithOrdersLines } from "./hooks/customers/useCustomers";
 */ /* import MenuModal from "./MenuModal";
 */

/* function getFirstIncompleteOrder(customer: Customer): Order | null {
  // On cherche la première commande avec le status "INCOMPLET"
  const order = customer.orders.find((o) => o.status === "INCOMPLETE");
  return order || null;
}
 */
import HeaderBarHome from "./HeaderBarHome";

function Header() {

  const [showModal, setModalOpen] = useState(false);
  const [showPanier, setShowPanier] = useState(false);
  const [customer, setCustomer] = useState(null);

  const { data: customers, isLoading, error } = useCustomerswithOrdersLines();

  useEffect(() => {
    if (customers && customers.length > 0) {
      const cust = customers.find((c) => c.id === 1) || null;
      setCustomer(cust);
    }
  }, [customers]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading customers.</div>;

  return (
    <div className={`${styles.header} d-flex flex-column mb-3`}>
      <div className="row">
        <div className="col d-flex flex-row align-items-center ms-3">
          <i
            className="fa-solid fa-bars fa-3x"
            onClick={() => setModalOpen(true)}
          ></i>
          {showModal && (
            <MenuModal>
              <i
                className="fa-solid fa-x fa-3x"
                onClick={() => setModalOpen(false)}
              ></i>
              <HeaderBar />
            </MenuModal>
          )}
          <HeaderBar />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ul
            className={`${styles.headerNav} d-flex flex-row justify-content-center align-items-center ms-3 me-3 gap-4`}
          >
            <li>
              <a href="/reservation">Réservation</a>
            </li>
            <span className="separator"></span>

            <li>
              <a href="/menu">Menu</a>
            </li>
            <span className="separator"></span>

            <li>
              <a href="/orders">Commandes</a>
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="col">
            <ul
                className={`${styles.headerNavItem} d-flex flex-row justify-content-center align-items-center ms-3 me-3 gap-4`}
            >
              <span className="separatorSecondary"></span>

              <li>
                <a href="/account/favoris">
                  <i className="fa-solid fa-heart fa-lg me-2"></i>
                  Favories
                </a>
              </li>
              <span className="separatorSecondary"></span>

            <li>
              <a href="#" onClick={() => setShowPanier(true)}>
                <i className="fa-solid fa-basket-shopping fa-lg me-2"></i>
                Panier
              </a>
              {showPanier && (
                <GenericModal
                  show={showPanier}
                  showHeader={true}
                  onClose={() => setShowPanier(false)}
                  title="Mon panier"
                  placement="start"
                >
                  <Basket client={customer} />
                </GenericModal>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
