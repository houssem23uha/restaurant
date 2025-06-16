import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createReservation,
  updateReservation,
  deleteReservation,
} from "../../api/reservationApi";
import type {Reservation} from "../../types";

export const useCreateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation<Reservation, Error, Partial<Reservation>>({
    mutationFn: createReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });
};

export const useUpdateReservation = () => {
  const queryClient = useQueryClient();

  return useMutation<Reservation, Error, Reservation>({
    mutationFn: updateReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });
};


export const useDeleteReservation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: deleteReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
    },
  });
};
