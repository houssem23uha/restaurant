import React, { useState } from "react";
import type { Customer } from "../../models/Customer";
import { createCustomer } from "../../services/customerService";

export function CustomerCreateForm() {
  const [customer, setCustomer] = useState<Partial<Customer>>({
    firstname: "",
    lastname: "",
    login: "",
    phone: "",
    photo: ""
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCustomer(customer as Customer);
      alert("Client créé !");
      setCustomer({ firstname: "", lastname: "", login: "", phone: "", photo: "" });
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input name="firstname" placeholder="Prénom" value={customer.firstname} onChange={handleChange} />
      <input name="lastname" placeholder="Nom" value={customer.lastname} onChange={handleChange} />
      <input name="login" placeholder="Email/Login" value={customer.login} onChange={handleChange} />
      <input name="phone" placeholder="Téléphone" value={customer.phone} onChange={handleChange} />
      <input name="photo" placeholder="Photo URL" value={customer.photo} onChange={handleChange} />
      <button type="submit">Créer</button>
    </form>
  );
}
