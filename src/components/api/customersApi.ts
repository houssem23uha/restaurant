import apiClient from "../servicesh/apiClient";
import type { Customer } from "../types/index";

export const fetchCustomers = async (): Promise<Customer[]> => {
  const res = await apiClient.get<Customer[]>("/customers");
  return res.data;
};

export const fetchCustomerswithOrdersLines = async (): Promise<Customer[]> => {
  const res = await apiClient.get<Customer[]>("/customers/withOrdersLines");
  return res.data;
};

export const fetchCustomer = async (ref: number): Promise<Customer> => {
  const res = await apiClient.get<Customer>(`/customers/${ref}`);
  return res.data;
};

export const createCustomer = async (
  item: Omit<Customer, "ref">
): Promise<Customer> => {
  const res = await apiClient.post<Customer>("/customers", item);
  return res.data;
};

export const updateCustomer = async (item: Customer): Promise<Customer> => {
  const res = await apiClient.put<Customer>(`/customers`, item);
  return res.data;
};

export const deleteCustomer = async (id: number): Promise<void> => {
  await apiClient.delete(`/customers/${id}`);
};

export const loginCustomer = async (
  login: string,
  password: string
): Promise<Customer> => {
  const res = await apiClient.post<Customer>("/customers/login", {
    login,
    password,
  });
  return res.data;
};

export const uploadCustomerPhoto = async ({
  file,
  fileName,
}: {
  file: File;
  fileName: string;
}): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file, fileName);

  const res = await apiClient.post<string>("/customers/uploadPhoto", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data; // le nom du fichier côté serveur
};

export const loadCustomerPhoto = async (filename: string): Promise<string> => {
  const res = await apiClient.get<ArrayBuffer>(
    `/customers/loadPhoto/${filename}`,
    {
      responseType: "arraybuffer",
    }
  );

  const base64 = btoa(
    new Uint8Array(res.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );

  const contentType = res.headers["content-type"] || "image/jpeg";
  return `data:${contentType};base64,${base64}`;
};
