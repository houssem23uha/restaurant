import React, { useState, useEffect } from "react";
import type { Customer } from "../../../models/Customer";
import { getCustomerById, updateCustomer } from "../../../services/customerService";

type Props = {
  id: number;
};

export function CustomerUpdateForm({ id }: Props) {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getCustomerById(id)
      .then(setCustomer)
      .catch(e => setError(e.message));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!customer) return;
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(customer);
    if (!customer) return;
    try {
      await updateCustomer(id, customer);
      alert("Client modifié !");
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!customer) return <p>Chargement...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstname" placeholder="Prénom" value={customer.firstname} onChange={handleChange} />
      <input name="lastname" placeholder="Nom" value={customer.lastname} onChange={handleChange} />
      <input name="login" placeholder="Email/Login" value={customer.login} onChange={handleChange} />
      <input name="phone" placeholder="Téléphone" value={customer.phone} onChange={handleChange} />
      <input name="photo" placeholder="Photo URL" value={customer.photo} onChange={handleChange} />
      <button type="submit">Modifier</button>
    </form>
  );
}
