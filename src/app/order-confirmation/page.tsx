"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function OrderConfirmationPage() {
  const params = useSearchParams();
  const reference = params.get("ref") ?? "N/A";
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: "120px 48px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 40,
          height: 2,
          margin: "0 auto 16px",
          backgroundColor: "var(--color-burnt-orange)",
        }}
      />
      <h1
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontSize: 48,
          fontWeight: 300,
          color: "var(--color-espresso)",
        }}
      >
        Order confirmed.
      </h1>
      <p
        style={{
          margin: "12px 0 20px",
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 24,
          color: "var(--color-burnt-orange)",
        }}
      >
        Thank you for shopping with Eleven08.
      </p>
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-ui)",
          fontSize: 12,
          color: "var(--color-smoke)",
        }}
      >
        Order reference: {reference}
      </p>

      <div
        style={{
          marginTop: 22,
          backgroundColor: "var(--color-sand)",
          borderLeft: "3px solid var(--color-burnt-orange)",
          padding: "16px",
          textAlign: "left",
          fontFamily: "var(--font-ui)",
          fontSize: 13,
          color: "var(--color-graphite)",
        }}
      >
        Your order will be dispatched within 2–5 working days. We&apos;ll be in
        touch via WhatsApp and email.
      </div>

      <div
        style={{
          marginTop: 24,
          display: "flex",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <Link
          href="/shop"
          style={{
            border: "1px solid var(--color-burnt-orange)",
            backgroundColor: "var(--color-burnt-orange)",
            color: "var(--color-cream)",
            textDecoration: "none",
            padding: "12px 16px",
            fontFamily: "var(--font-ui)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          Continue Shopping
        </Link>
        <Link
          href={`https://wa.me/2347030000117?text=${encodeURIComponent(`Hi, I'd like to track my order. Ref: ${reference}`)}`}
          target="_blank"
          style={{
            border: "1px solid var(--color-espresso)",
            color: "var(--color-espresso)",
            textDecoration: "none",
            padding: "12px 16px",
            fontFamily: "var(--font-ui)",
            fontSize: 10,
            textTransform: "uppercase",
            letterSpacing: "0.2em",
          }}
        >
          Track via WhatsApp
        </Link>
      </div>
    </main>
  );
}
