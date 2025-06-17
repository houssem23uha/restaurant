import { useQuery } from "@tanstack/react-query";
import { fetchCustomer } from "../../api/customersApi";

export const useCustomer = (id: number) => {
  return useQuery({
    queryKey: ["customers", id],
    queryFn: () => fetchCustomer(id),
    enabled: !!id,
  });
};
