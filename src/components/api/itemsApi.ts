import apiClient from "../servicesh/apiClient";
import type { Item } from "../types";

export const fetchItems = async (): Promise<Item[]> => {
  const res = await apiClient.get<Item[]>("/items");
  return res.data;
};

export const fetchItem = async (ref: number): Promise<Item> => {
  const res = await apiClient.get<Item>(`/items/${ref}`);
  return res.data;
};

export const createItem = async (item: Omit<Item, "ref">): Promise<Item> => {
  const res = await apiClient.post<Item>("/items", item);
  return res.data;
};

export const updateItem = async (item: Item): Promise<Item> => {
  const res = await apiClient.put<Item>(`/items`, item);
  return res.data;
};

export const deleteItem = async (id: number): Promise<void> => {
  await apiClient.delete(`/items/${id}`);
};
