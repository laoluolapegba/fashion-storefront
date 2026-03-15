"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { CartItem } from "@/types/cart";

const CART_STORAGE_KEY = "eleven08_cart";

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: { productId: string; size: string } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: string; size: string; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; payload: CartItem[] };

function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.size === action.payload.size,
      );

      if (existingIndex >= 0) {
        return state.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...state, { ...action.payload, quantity: 1 }];
    }
    case "REMOVE_ITEM":
      return state.filter(
        (item) =>
          !(
            item.productId === action.payload.productId &&
            item.size === action.payload.size
          ),
      );
    case "UPDATE_QUANTITY":
      if (action.payload.quantity <= 0) {
        return state.filter(
          (item) =>
            !(
              item.productId === action.payload.productId &&
              item.size === action.payload.size
            ),
        );
      }
      return state.map((item) =>
        item.productId === action.payload.productId &&
        item.size === action.payload.size
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );
    case "CLEAR_CART":
      return [];
    case "HYDRATE":
      return action.payload;
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, dispatch] = useReducer(cartReducer, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored) as CartItem[];
      if (Array.isArray(parsed)) {
        dispatch({ type: "HYDRATE", payload: parsed });
      }
    } catch (error) {
      console.error("Unable to hydrate cart", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
      removeItem: (productId, size) =>
        dispatch({ type: "REMOVE_ITEM", payload: { productId, size } }),
      updateQuantity: (productId, size, quantity) =>
        dispatch({
          type: "UPDATE_QUANTITY",
          payload: { productId, size, quantity },
        }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
      itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      ),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
