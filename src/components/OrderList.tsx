import styles from "./OrderListe.module.scss";

function OrderList() {
  return (
    <>
      <div className={`${styles.OrderListContent}`}>
        <div
          className={`${styles.MenuTitle} d-flex justify-content-center mb-3 page-title`}
        >
          <h1>Commandes</h1>
        </div>

        <div className="grid my-5"></div>
      </div>
    </>
  );
}

export default OrderList;
