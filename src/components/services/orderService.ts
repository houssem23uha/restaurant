// src/services/orderService.ts
import type { Order } from "../models/Order";
import { fetchJSON } from "./api";

const baseUrl = "http://localhost:8080/site/orders";

export async function getOrders(): Promise<Order[]> {
  return fetchJSON<Order[]>(baseUrl);
}

export async function getOrderById(id: number): Promise<Order> {
  return fetchJSON<Order>(`${baseUrl}/${id}`);
}

export async function createOrder(order: Order): Promise<Order> {
  return fetchJSON<Order>(baseUrl, { method: "POST", body: JSON.stringify(order) });
}

export async function updateOrder(id: number, order: Order): Promise<Order> {
  return fetchJSON<Order>(`${baseUrl}/${id}`, { method: "PUT", body: JSON.stringify(order) });
}

export async function deleteOrder(id: number): Promise<void> {
  await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
}
