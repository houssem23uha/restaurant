import styles from "./OrderListe.module.scss";
import { Table } from "react-bootstrap";
import { useCustomer } from "./CustomerContext";
import { useCustomerwithOrdersLines } from "./hooks/customers/useCustomer";

function OrderList() {
  const { customer } = useCustomer();
  console.log("customer", customer);

  const {
    data: client,
    isLoading,
    error,
  } = useCustomerwithOrdersLines(customer?.id); // Hook toujours appelé

  console.log("client", client);

  if (!customer) return <p>Chargement du client...</p>;
  if (isLoading) return <p>Chargement des commandes...</p>;
  if (error instanceof Error) return <p>Erreur : {error.message}</p>;
  if (!client) return <p>Aucune commande trouvée.</p>;

  const filteredOrders = client.orders;
  console.log("filteredOrders", filteredOrders);

  return (
    <div className={`${styles.OrderListContent}`}>
      <div
        className={`${styles.MenuTitle} d-flex justify-content-center mb-3 page-title`}
      >
        <h1>Mes Commandes</h1>
      </div>

      <div className="my-5">
        {filteredOrders.map((commande) => (
          <div key={commande.id} style={{ marginBottom: "2rem" }}>
            <h5>
              Commande #{commande.id} - Client : {customer.lastname}
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
                    <td>{ligne?.item?.name}</td>
                    <td>{ligne?.quantity}</td>
                    <td>{ligne?.item?.price.toFixed(2)}</td>
                    <td>{ligne?.line_price.toFixed(2)}</td>
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
                      .reduce((acc, ligne) => acc + ligne.line_price, 0)
                      .toFixed(2)}
                  </td>
                </tr>
              </tfoot>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;
