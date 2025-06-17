import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createAdress,
  updateAdress,
  deleteAdress,
} from "../../api/adressesApi";

export const useCreateAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createAdress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};

export const useUpdateAdress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAdress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};

export const useDeleteAdress = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteAdress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
    },
  });
};
