import styles from "./OrderListe.module.scss";
import { Table, Button } from "react-bootstrap";
import { useCustomer } from "./CustomerContext";
import { useCustomerwithOrdersLines } from "./hooks/customers/useCustomer";

function OrderList() {
  const { customer } = useCustomer();

  const {
    data: client,
    isLoading,
    error,
  } = useCustomerwithOrdersLines(customer?.id);

  if (!customer) return <p>Chargement du client...</p>;
  if (isLoading) return <p>Chargement des commandes...</p>;
  if (error instanceof Error) return <p>Erreur : {error.message}</p>;
  if (!client) return <p>Aucune commande trouvée.</p>;

  const filteredOrders = client.orders;

  // Fonction pour imprimer une commande spécifique
  const printOrder = (orderId) => {
    const printContent = document.getElementById(`print-section-${orderId}`);
    if (!printContent) return;

    const WinPrint = window.open("", "", "width=900,height=650");
    if (!WinPrint) return;

    WinPrint.document.write(`
      <html>
        <head>
          <title>Commande #${orderId}</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
              font-family: Arial, sans-serif;
            }
            th, td {
              border: 1px solid #ccc;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f5f5f5;
            }
            tfoot td {
              font-weight: bold;
              text-align: right;
            }
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);

    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
  };

  return (
    <div className={`${styles.OrderListContent}`}>
      <div className={`${styles.MenuTitle} d-flex justify-content-center mb-3 page-title`}>
        <h1>Mes Commandes</h1>
      </div>

      <div className="my-5">
        {filteredOrders.map((commande) => (
          <div key={commande.id} style={{ marginBottom: "2rem" }}>
            <h5>
              Commande #{commande.id} - Client : {customer.lastname}
            </h5>

            <Button
              variant="secondary"
              size="sm"
              className="mb-3"
              onClick={() => printOrder(commande.id)}
            >
              Imprimer PDF
            </Button>

            <div id={`print-section-${commande.id}`}>
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
                    <td colSpan={3} style={{ textAlign: "right", fontWeight: "bold" }}>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;
