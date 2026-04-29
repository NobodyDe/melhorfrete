export type ShippingProduct = {
  id: number; // ID interno seu (string)
  width: number; // largura em cm
  height: number; // altura em cm
  length: number; // comprimento em cm
  weight: number; // peso em kg
  insurance_value: number; // valor declarado do produto
  quantity: number;
};

type Addrees = {
  postal_code: string;
};

type QuoteRequest = {
  receipt: boolean;
  own_hand: boolean;
  insurance_value: number;
  reverse: boolean;
  non_commercial: boolean;
};

export type ShippingRequest = {
  from: Addrees;
  to: Addrees;
  products: ShippingProduct[];
  options: QuoteRequest;
};
