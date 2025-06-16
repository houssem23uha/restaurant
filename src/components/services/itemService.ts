// src/services/itemService.ts
import type { Item } from "../models/Item";
import { fetchJSON } from "./api";

const baseUrl = "http://localhost:8080/site/items";


export async function getItems(): Promise<Item[]> {
  return fetchJSON<Item[]>(baseUrl);
}


export async function getItemById(id: number): Promise<Item> {
  return fetchJSON<Item>(`${baseUrl}/${id}`);
}


export async function createItem(item: Item): Promise<Item> {
  return fetchJSON<Item>(baseUrl, { method: "POST", body: JSON.stringify(item) });
}

export async function updateItem(id: number, item: Item): Promise<Item> {
  return fetchJSON<Item>(`${baseUrl}`, { method: "PUT", body: JSON.stringify(item) });
}


export async function deleteItem(id: number): Promise<void> {
  await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
}
