"use server";

import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendOrderConfirmationEmail } from "@/lib/email/orderConfirmation";
import type { CartItem } from "@/types/cart";
import type { ShippingDetails, VerifyOrderResult } from "@/types/orders";

interface PaystackVerifyResponse {
  data?: {
    status?: string;
  };
}

export async function verifyAndCreateOrder(
  reference: string,
  shipping: ShippingDetails,
  items: CartItem[],
): Promise<VerifyOrderResult> {
  try {
    const { data: existingOrder } = await supabaseAdmin
      .from("orders")
      .select("id")
      .eq("paystack_ref", reference)
      .maybeSingle();

    if (existingOrder) {
      return { success: true, orderId: existingOrder.id };
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );
    const result = (await response.json()) as PaystackVerifyResponse;
    if (result.data?.status !== "success") {
      return { success: false, error: "Payment verification failed." };
    }

    const productIds = [...new Set(items.map((item) => item.productId))];
    const { data: products, error: productsError } = await supabaseAdmin
      .from("products")
      .select("id, price")
      .in("id", productIds);

    if (productsError) {
      return { success: false, error: productsError.message };
    }

    const total = items.reduce((sum, item) => {
      const product = products?.find(
        (productItem) => productItem.id === item.productId,
      );
      return sum + Number(product?.price ?? 0) * item.quantity;
    }, 0);

    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: shipping.full_name,
        customer_email: shipping.email,
        customer_phone: shipping.phone,
        shipping_address: shipping.address,
        shipping_city: shipping.city,
        shipping_state: shipping.state,
        shipping_country: shipping.country,
        notes: shipping.notes || null,
        total_amount: total,
        status: "confirmed",
        payment_status: "paid",
        paystack_ref: reference,
      })
      .select()
      .single();

    if (orderError || !order) {
      return {
        success: false,
        error: orderError?.message ?? "Unable to create order.",
      };
    }

    const { error: itemsError } = await supabaseAdmin
      .from("order_items")
      .insert(
        items.map((item) => ({
          order_id: order.id,
          product_id: item.productId,
          name: item.name,
          size: item.size,
          quantity: item.quantity,
          unit_price:
            products?.find((productItem) => productItem.id === item.productId)
              ?.price ?? item.price,
        })),
      );

    if (itemsError) {
      return { success: false, error: itemsError.message };
    }

    await sendOrderConfirmationEmail(order, items);

    return { success: true, orderId: order.id };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unexpected order error.",
    };
  }
}

export async function updateOrderStatus(id: string, status: string) {
  const { error } = await supabaseAdmin
    .from("orders")
    .update({ status })
    .eq("id", id);
  if (error) return { success: false, error: error.message };
  return { success: true };
}
