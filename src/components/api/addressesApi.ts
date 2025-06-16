import apiClient from "../servicesh/apiClient";
import type { Address } from "../models/Address";

export const fetchAddresss = async (): Promise<Address[]> => {
  const res = await apiClient.get<Address[]>("/addresses");
  return res.data;
};

export const fetchAddress = async (ref: number): Promise<Address> => {
  const res = await apiClient.get<Address>(`/addresses/${ref}`);
  return res.data;
};

export const createAddress = async (item: Omit<Address, "ref">): Promise<Address> => {
  const res = await apiClient.post<Address>("/addresses", item);
  return res.data;
};

export const updateAddress = async (item: Address): Promise<Address> => {
  const res = await apiClient.put<Address>(`/addresses`, item);
  return res.data;
};

export const deleteAddress = async (id: number): Promise<void> => {
  await apiClient.delete(`/addresses/${id}`);
};

