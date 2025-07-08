import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer, updateCustomer, deleteCustomer , loginCustomer  } from "../../api/customersApi";
import type { Customer } from "../../types/index";

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};


export const useLoginCustomer = () =>
  useMutation({
    mutationFn: ({ login, password }: { login: string; password: string }) =>
      loginCustomer(login, password),
  });



export const useUpdateCustomerFavorites = () => {
  const queryClient = useQueryClient();

  return useMutation<Customer, unknown, Customer>({
    mutationFn: (updatedCustomer: Customer) => updateCustomer(updatedCustomer),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["customer"] });
    },
  });
};
