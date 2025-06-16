import { useQuery } from "@tanstack/react-query";
import { fetchReservations } from "../../api/reservationApi";
import type { Reservation } from "../../types";

export const useReservations = () => {
  return useQuery<Reservation[], Error>({
    queryKey: ["reservations"],
    queryFn: fetchReservations,
  });
};
