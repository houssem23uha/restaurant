// src/components/Customer/CustomerList.tsx
import React, { useEffect, useState } from "react";
import type { Customer } from "../../../models/Customer";
import { getCustomers, deleteCustomer } from "../../../services/customerService";

export function CustomerList() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getCustomers()
      .then(data => setCustomers(data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteCustomer(id);
      setCustomers(customers.filter(c => c.id !== id));
    } catch (e: unknown) {
      if (e instanceof Error) {
    console.error("Erreur :", e.message);
  } else {
    console.error("Erreur inconnue", e);
  }
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error}</p>;

  return (
    <div>
      <h2>Clients</h2>
      <ul>
        {customers.map(c => (
          <li key={c.id}>
            {c.firstname} {c.lastname} - {c.login}
            <button onClick={() => handleDelete(c.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
