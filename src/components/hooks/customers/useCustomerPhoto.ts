
import { useMutation, useQuery } from "@tanstack/react-query";
import { loadCustomerPhoto, uploadCustomerPhoto } from "../../api/customersApi";

export const useUploadPhoto = () =>
  useMutation<string, Error, { file: File; fileName: string }>({
    mutationFn: (variables) => uploadCustomerPhoto(variables),
  });
export const useLoadPhoto = (filename?: string) => {
  return useQuery({
    queryKey: ["customerPhoto", filename],
    queryFn: () => loadCustomerPhoto(filename!),
    enabled: !!filename,
  });
};
