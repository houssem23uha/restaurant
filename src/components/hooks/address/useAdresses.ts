import { useQuery } from "@tanstack/react-query";
import { fetchAdresses } from "../../api/adressesApi";

export const useAddresses = () => {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: fetchAdresses,
  });
};
