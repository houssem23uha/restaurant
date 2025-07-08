import apiClient from "../servicesh/apiClient";
import type { Address } from "../types";

export const fetchAdresses = async (): Promise<Address[]> => {
  const res = await apiClient.get<Address[]>("/addresses");
  return res.data;
};

export const fetchAdress = async (id: number): Promise<Address> => {
  const res = await apiClient.get<Address>(`/addresses/${id}`);
  return res.data;
};

export const createAdress = async (
  adress: Omit<Address, "id">
): Promise<Address> => {
  const res = await apiClient.post<Address>("/addresses", adress);
  return res.data;
};

export const updateAdress = async (adress: Address): Promise<Address> => {
  const res = await apiClient.put<Address>(`/addresses`, adress);
  return res.data;
};

export const deleteAdress = async (id: number): Promise<void> => {
  await apiClient.delete(`/addresses/${id}`);
};
