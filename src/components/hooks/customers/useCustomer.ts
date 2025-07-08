import { useQuery } from "@tanstack/react-query";
import {
  fetchCustomer,
  fetchCustomerwithOrdersLines,
} from "../../api/customersApi";

export const useCustomer = (id: number) => {
  return useQuery({
    queryKey: ["customers", id],
    queryFn: () => fetchCustomer(id),
    enabled: !!id,
  });
};

export const useCustomerwithOrdersLines = (id: number) => {
  return useQuery({
    queryKey: ["customers/withOrdersLines", id],
    queryFn: () => fetchCustomerwithOrdersLines(id),
    enabled: !!id,
  });
};
