import { useQuery } from "@tanstack/react-query";
import { fetchItem } from "../../api/itemsApi";

export const useItem = (ref: number) => {
  return useQuery({
    queryKey: ["items", ref],
    queryFn: () => fetchItem(ref),
    enabled: !!ref,
  });
};
