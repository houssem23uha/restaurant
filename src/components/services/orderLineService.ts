import type { OrderLine } from "../models/OrderLine";
import { fetchJSON } from "./api";

const baseUrl = "http://localhost:8080/site/orderLines";

export async function getOrderLines(): Promise<OrderLine[]> {
  return fetchJSON<OrderLine[]>(baseUrl);
}

export async function getOrderLineById(id: number): Promise<OrderLine> {
  return fetchJSON<OrderLine>(`${baseUrl}/${id}`);
}

export async function createOrderLine(orderLine: OrderLine): Promise<OrderLine> {
  return fetchJSON<OrderLine>(baseUrl, { method: "POST", body: JSON.stringify(orderLine) });
}

export async function updateOrderLine(id: number, orderLine: OrderLine): Promise<OrderLine> {
  return fetchJSON<OrderLine>(`${baseUrl}`, { method: "PUT", body: JSON.stringify(orderLine) });
}

export async function deleteOrderLine(id: number): Promise<void> {
  await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
}
