import styles from "./OrderListe.module.scss";
import { Table } from "react-bootstrap";
import { useOrders } from "./hooks/Orders/useOrders";
import { useCustomer } from "./CustomerContext";
import { useCustomerwithOrdersLines } from "./hooks/customers/useCustomer";

function OrderList() {
  /*   const { customer } = useCustomer();
  const {
    data: client,
    isLoading,
    error,
  } = useCustomerwithOrdersLines(customer?.id);

  if (isLoading) return <p>Chargement...</p>;
  if (error instanceof Error) return <p>Erreur : {error.message}</p>;
  console.log("customer", customer);
  console.log(client.orders);

  const filteredOrders = client.orders.filter(
    (order) => order.customer && order.customer.id === customer?.id
  ) */ return (
    <>
      <div className={`${styles.OrderListContent}`}>
        <div
          className={`${styles.MenuTitle} d-flex justify-content-center mb-3 page-title`}
        >
          <h1>Commandes</h1>
        </div>

        <div className=" my-5">
          {/*           {filteredOrders.map((commande) => (
            <div key={commande.id} style={{ marginBottom: "2rem" }}>
              <h5>
                Commande #{commande.id} - Client : {commande.customer.id}
              </h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Produit</th>
                    <th>Quantité</th>
                    <th>Prix Unitaire (€)</th>
                    <th>Total (€)</th>
                  </tr>
                </thead>
                <tbody>
                  {commande.order_lines.map((ligne, index) => (
                    <tr key={index}>
                      <td>{ligne.item.name}</td>
                      <td>{ligne.quantity}</td>
                      <td>{ligne.item.price.toFixed(2)}</td>
                      <td>{ligne.line_price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td
                      colSpan={3}
                      style={{ textAlign: "right", fontWeight: "bold" }}
                    >
                      Total Commande (€)
                    </td>
                    <td style={{ fontWeight: "bold" }}>
                      {commande.order_lines
                        .reduce(
                          (acc, ligne) =>
                            acc + ligne.quantity * ligne.line_price,
                          0
                        )
                        .toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </div>
          ))} */}
        </div>
      </div>
    </>
  );
}

export default OrderList;
