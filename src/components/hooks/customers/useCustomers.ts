import { useQuery } from "@tanstack/react-query";
import {
  fetchCustomers,
  fetchCustomerswithOrdersLines,
} from "../../api/customersApi";

export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
  });
};
export const useCustomerswithOrdersLines = () => {
  return useQuery({
    queryKey: ["customers/withOrdersLines"],
    queryFn: fetchCustomerswithOrdersLines,
  });
};
