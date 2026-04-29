import axios from "axios";
import type { ShippingRequest } from "../types/shipping";

const api = axios.create({
  baseURL: "/melhorenvio/api/v2/me",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_MELHOR_ENVIO_TOKEN}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export async function calculateShipping(payload: ShippingRequest) {
  const { data } = await api.post("/shipment/calculate", payload);
  return data;
}
