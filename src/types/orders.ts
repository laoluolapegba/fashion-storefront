import type { CartItem } from "@/types/cart";

export interface ShippingDetails {
  full_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  notes: string;
}

export interface VerifyOrderResult {
  success: boolean;
  orderId?: string;
  error?: string;
}

export type OrderEmailItem = Pick<
  CartItem,
  "name" | "size" | "quantity" | "price"
>;
