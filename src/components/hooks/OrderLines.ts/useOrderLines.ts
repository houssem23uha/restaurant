import { useQuery } from "@tanstack/react-query";
import { fetchOrderLines } from "../../api/orderLinesApi";

export const useOrderLines = () => {
  return useQuery({
    queryKey: ["order_lines"],
    queryFn: fetchOrderLines,
  });
};
