import apiClient from "../servicesh/apiClient";
import type { OrderLine } from "../types";

export const fetchOrderLines = async (): Promise<OrderLine[]> => {
  const res = await apiClient.get<OrderLine[]>("/order_lines");
  return res.data;
};

export const fetchOrderLine = async (id: number): Promise<OrderLine> => {
  const res = await apiClient.get<OrderLine>(`/order_lines/${id}`);
  return res.data;
};

export const createOrderLine = async (
  orderLine: Omit<OrderLine, "id">
): Promise<OrderLine> => {
  const res = await apiClient.post<OrderLine>("/order_lines", orderLine);
  return res.data;
};

export const updateOrderLine = async (
  orderLine: OrderLine
): Promise<OrderLine> => {
  const res = await apiClient.put<OrderLine>(`/order_lines`, orderLine);
  return res.data;
};

export const deleteOrderLine = async (id: number): Promise<void> => {
  await apiClient.delete(`/order_lines/${id}`);
};
