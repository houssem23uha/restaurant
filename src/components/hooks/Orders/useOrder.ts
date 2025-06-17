import { useQuery } from "@tanstack/react-query";
import { fetchOrder } from "../../api/ordersApi";

export const useOrder = (id: number) => {
  return useQuery({
    queryKey: ["orders", id],
    queryFn: () => fetchOrder(id),
    enabled: !!id,
  });
};
