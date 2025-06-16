import { useQuery } from "@tanstack/react-query";
import { fetchItems } from "../../api/itemsApi";

export const useItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: fetchItems,
  });
};
