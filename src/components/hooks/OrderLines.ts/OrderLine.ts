import { useQuery } from "@tanstack/react-query";
import { fetchOrderLine } from "../../api/orderLinesApi";

export const useOrderLine = (id: number) => {
  return useQuery({
    queryKey: ["order_lines", id],
    queryFn: () => fetchOrderLine(id),
    enabled: !!id,
  });
};
