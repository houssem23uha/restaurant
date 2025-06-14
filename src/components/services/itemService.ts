// src/services/itemService.ts
import type { Item } from "../models/Item";
import { fetchJSON } from "./api";

const baseUrl = "http://localhost:8080/site/items";

export async function getIngredients(): Promise<Item[]> {
  return fetchJSON<Item[]>(baseUrl);
}

export async function getIngredientById(id: number): Promise<Item> {
  return fetchJSON<Item>(`${baseUrl}/${id}`);
}

export async function createIngredient(ingredient: Item): Promise<Item> {
  return fetchJSON<Item>(baseUrl, { method: "POST", body: JSON.stringify(ingredient) });
}

export async function updateIngredient(id: number, ingredient: Item): Promise<Item> {
  return fetchJSON<Item>(`${baseUrl}`, { method: "PUT", body: JSON.stringify(ingredient) });
}

export async function deleteIngredient(id: number): Promise<void> {
  await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
}
