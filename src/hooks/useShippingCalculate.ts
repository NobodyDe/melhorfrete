import { useMutation } from "@tanstack/react-query";
import { calculateShipping } from "../services/shippingService";

export function useShippingCalculate() {
  return useMutation({
    mutationFn: calculateShipping,
  });
}
