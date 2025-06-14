// src/services/orderService.ts
import type { Order } from "../models/Order";
import { fetchJSON } from "./api";

const baseUrl = "http://localhost:8080/site/orders";

export async function getIngredients(): Promise<Order[]> {
  return fetchJSON<Order[]>(baseUrl);
}

export async function getIngredientById(id: number): Promise<Order> {
  return fetchJSON<Order>(`${baseUrl}/${id}`);
}

export async function createIngredient(ingredient: Order): Promise<Order> {
  return fetchJSON<Order>(baseUrl, { method: "POST", body: JSON.stringify(ingredient) });
}

export async function updateIngredient(id: number, ingredient: Order): Promise<Order> {
  return fetchJSON<Order>(`${baseUrl}`, { method: "PUT", body: JSON.stringify(ingredient) });
}

export async function deleteIngredient(id: number): Promise<void> {
  await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
}
