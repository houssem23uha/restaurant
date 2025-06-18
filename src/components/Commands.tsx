import React from "react";
import { Table } from "react-bootstrap";
import { useOrders } from "./hooks/Orders/useOrders";
import { useCustomer } from "./CustomerContext";

function CommandesTable() {
  const { customer } = useCustomer();
  const { data: orders, isLoading, error } = useOrders();

  if (isLoading) return <p>Chargement...</p>;
  if (error instanceof Error) return <p>Erreur : {error.message}</p>;

  // Attention, il faut bien utiliser customer.id ici
  const filteredOrders = orders.filter(
    (order) => order.customer && order.customer.id === customer?.id
  );

  if (filteredOrders.length === 0) {
    return <p>No orders found for customer ID {customer?.id}</p>;
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Status</th>
          <th>Total Price (€)</th>
          <th>Order Lines</th>
        </tr>
      </thead>
      <tbody>
        {filteredOrders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.status}</td>
            <td>{order.totalPrice.toFixed(2)}</td>
            <td>
              <ul>
                {order.order_lines.map((line) => (
                  <li key={line.id}>
                    Quantity: {line.quantity} — Price: €
                    {line.line_price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CommandesTable;
