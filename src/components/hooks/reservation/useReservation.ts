import { useQuery } from "@tanstack/react-query";
import { fetchReservation } from "../../api/reservationApi";

export const useReservation = (id: number) => {
  return useQuery({
    queryKey: ["reservation", id],
    queryFn: () => fetchReservation(id),
    enabled: !!id,
  });
};
