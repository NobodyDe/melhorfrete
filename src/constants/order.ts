import type { OrderState } from "../types/order";

export const INITIAL_ORDER: OrderState = {
  items: [],
  address: null,
  selectedShippingId: null,
};
