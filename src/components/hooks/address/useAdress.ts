import { useQuery } from "@tanstack/react-query";
import { fetchAdress } from "../../api/adressesApi";

export const useAdress = (id: number) => {
  return useQuery({
    queryKey: ["addresses", id],
    queryFn: () => fetchAdress(id),
    enabled: !!id,
  });
};
