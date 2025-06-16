// src/services/customerService.ts
import type { Customer } from "../models/Customer";
import { fetchJSON } from "./api";
//
//const baseUrl = `${API_BASE}/customers`;

const baseUrl = "http://localhost:8080/site/customers";
// plus tard remplacer en back site par api et mettre a jour les urls

export async function getCustomers(): Promise<Customer[]> {
  return fetchJSON<Customer[]>(baseUrl);
}

export async function getCustomerById(id: number): Promise<Customer> {
  return fetchJSON<Customer>(`${baseUrl}/${id}`);
}

export async function createCustomer(customer: Customer): Promise<Customer> {
  return fetchJSON<Customer>(baseUrl, { method: "POST", body: JSON.stringify(customer) });
}

export async function updateCustomer(id: number, customer: Customer): Promise<Customer> {
 return fetchJSON<Customer>(`${baseUrl}`, { method: "PUT", body: JSON.stringify(customer) });
}

export async function loginCustomer(login: string, password: string): Promise<Customer> {
 return fetchJSON<Customer>(`${baseUrl}/login`, { method: "POST", body: JSON.stringify({ login, password }) });
}// A dev en back dans le retour eviter de renvoyer le mdp 



export async function deleteCustomer(id: number): Promise<void> {
  await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
}

export async function uploadPhoto(file: File, fileName: string): Promise<void> {
  const formData = new FormData();
  formData.append("file", file, fileName);

  const res = await fetch(`${baseUrl}/uploadPhoto`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }
}


export async function loadPhoto(fileName: string): Promise<string> {
  const res = await fetch(`${baseUrl}/loadPhoto/${fileName}`);

  if (!res.ok) {
    throw new Error(`Erreur lors du chargement de l'image: ${await res.text()}`);
  }

  const blob = await res.blob();

  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string); // base64 string
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}