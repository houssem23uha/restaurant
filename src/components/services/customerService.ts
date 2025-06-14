// src/services/customerService.ts
import type { Customer } from "../models/Customer";
import { fetchJSON } from "./api";
//
//const baseUrl = `${API_BASE}/customers`;

const baseUrl = "http://localhost:8080/site/customers";

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



export async function deleteCustomer(id: number): Promise<void> {
  await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
}
