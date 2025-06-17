import apiClient from "../servicesh/apiClient";
import type { Order } from "../types";

export const fetchOrders = async (): Promise<Order[]> => {
  const res = await apiClient.get<Order[]>("/orders");
  return res.data;
};

export const fetchOrder = async (id: number): Promise<Order> => {
  const res = await apiClient.get<Order>(`/orders/${id}`);
  return res.data;
};

export const createOrder = async (order: Omit<Order, "id">): Promise<Order> => {
  const res = await apiClient.post<Order>("/orders", order);
  return res.data;
};

export const updateOrder = async (order: Order): Promise<Order> => {
  const res = await apiClient.put<Order>(`/orders`, order);
  return res.data;
};

export const deleteOrder = async (id: number): Promise<void> => {
  await apiClient.delete(`/orders/${id}`);
};
