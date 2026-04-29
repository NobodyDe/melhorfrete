type OrderItems = {
  label: string;
  value: number;
};

type OrderSubTotal = {
  label: string;
  value: number;
};

type OrderAddress = {
  street: string;
  city: string;
  state: string;
  postal: string;
};

export type OrderState = {
  items: OrderItems[];
  address: OrderAddress | null;
  selectedShippingId: number | null; // ID da transportadora selecionada
};
