import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createOrderLine,
  updateOrderLine,
  deleteOrderLine,
} from "../../api/orderLinesApi";

export const useCreateOrderLine = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrderLine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order_lines"] });
    },
  });
};

export const useUpdateOrderLine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateOrderLine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order_lines"] });
    },
  });
};

export const useDeleteOrderLine = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrderLine,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order_lines"] });
    },
  });
};
