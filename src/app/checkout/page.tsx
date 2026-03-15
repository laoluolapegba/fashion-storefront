"use client";

import Script from "next/script";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { verifyAndCreateOrder } from "@/app/actions/orders";
import { useCart } from "@/context/CartContext";
import type { ShippingDetails } from "@/types/orders";

type PaymentState = "idle" | "processing" | "verifying";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

const initialShipping: ShippingDetails = {
  full_name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  country: "Nigeria",
  notes: "",
};

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [shippingDetails, setShippingDetails] =
    useState<ShippingDetails>(initialShipping);
  const [paymentState, setPaymentState] = useState<PaymentState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const requiredReady = useMemo(
    () =>
      Boolean(
        shippingDetails.full_name &&
        shippingDetails.email &&
        shippingDetails.phone &&
        shippingDetails.address &&
        shippingDetails.city &&
        shippingDetails.state &&
        shippingDetails.country,
      ),
    [shippingDetails],
  );

  useEffect(() => {
    if (items.length === 0) router.replace("/cart");
  }, [items, router]);

  const handlePaymentSuccess = async (reference: string) => {
    setPaymentState("verifying");
    const result = await verifyAndCreateOrder(
      reference,
      shippingDetails,
      items,
    );

    if (!result.success) {
      setErrorMessage(result.error ?? "Unable to verify payment.");
      setPaymentState("idle");
      return;
    }

    clearCart();
    router.push(`/order-confirmation?ref=${reference}`);
  };

  const initiatePaystackPayment = () => {
    if (!requiredReady) {
      setErrorMessage("Please complete all required fields.");
      return;
    }

    if (!window.PaystackPop) {
      setErrorMessage(
        "Payment SDK is not available. Please refresh and try again.",
      );
      return;
    }

    const handler = window.PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: shippingDetails.email,
      amount: subtotal * 100,
      currency: "NGN",
      ref: `ELEVEN08-${Date.now()}`,
      metadata: {
        custom_fields: [
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: shippingDetails.full_name,
          },
          {
            display_name: "Phone",
            variable_name: "phone",
            value: shippingDetails.phone,
          },
        ],
      },
      callback: (response: { reference: string }) => {
        void handlePaymentSuccess(response.reference);
      },
      onClose: () => {
        setPaymentState("idle");
      },
    });

    handler.openIframe();
    setPaymentState("processing");
    setErrorMessage("");
  };

  return (
    <>
      <Script src="https://js.paystack.co/v1/inline.js" strategy="lazyOnload" />
      <main
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "80px 48px",
          display: "flex",
          gap: 48,
        }}
      >
        <section style={{ flex: 3 }}>
          <h1
            style={{
              margin: 0,
              marginBottom: 22,
              fontFamily: "var(--font-display)",
              fontSize: 34,
              fontWeight: 300,
              color: "var(--color-espresso)",
            }}
          >
            Checkout
          </h1>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            {(
              [
                ["full_name", "Full Name"],
                ["email", "Email"],
                ["phone", "Phone"],
                ["address", "Address"],
                ["city", "City"],
                ["state", "State"],
                ["country", "Country"],
              ] as const
            ).map(([field, label]) => {
              const wide =
                field === "phone" || field === "address" || field === "country";
              return (
                <div
                  key={field}
                  style={{
                    display: "grid",
                    gap: 8,
                    gridColumn: wide ? "1 / span 2" : undefined,
                  }}
                >
                  <label
                    style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: 9,
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      color: "var(--color-smoke)",
                    }}
                  >
                    {label}{" "}
                    <span style={{ color: "var(--color-burnt-orange)" }}>
                      *
                    </span>
                  </label>
                  <input
                    value={shippingDetails[field]}
                    onChange={(event) =>
                      setShippingDetails((prev) => ({
                        ...prev,
                        [field]: event.target.value,
                      }))
                    }
                    style={{
                      border: "1px solid var(--color-linen)",
                      backgroundColor: "var(--color-white)",
                      padding: "12px 14px",
                      fontFamily: "var(--font-ui)",
                      fontSize: 13,
                      color: "var(--color-espresso)",
                    }}
                  />
                </div>
              );
            })}
            <div style={{ display: "grid", gap: 8, gridColumn: "1 / span 2" }}>
              <label
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 9,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  color: "var(--color-smoke)",
                }}
              >
                Order Notes
              </label>
              <textarea
                value={shippingDetails.notes}
                onChange={(event) =>
                  setShippingDetails((prev) => ({
                    ...prev,
                    notes: event.target.value,
                  }))
                }
                placeholder="Special instructions, delivery preferences..."
                rows={4}
                style={{
                  border: "1px solid var(--color-linen)",
                  backgroundColor: "var(--color-white)",
                  padding: "12px 14px",
                  fontFamily: "var(--font-ui)",
                  fontSize: 13,
                  color: "var(--color-espresso)",
                  resize: "vertical",
                }}
              />
            </div>
          </div>
          {errorMessage ? (
            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 12,
                color: "var(--color-error)",
              }}
            >
              {errorMessage}
            </p>
          ) : null}
          <button
            type="button"
            onClick={initiatePaystackPayment}
            disabled={!requiredReady || paymentState !== "idle"}
            style={{
              marginTop: 16,
              width: "100%",
              border: "1px solid var(--color-burnt-orange)",
              backgroundColor: requiredReady
                ? "var(--color-burnt-orange)"
                : "var(--color-linen)",
              color: requiredReady
                ? "var(--color-cream)"
                : "var(--color-smoke)",
              padding: "14px",
              fontFamily: "var(--font-ui)",
              fontSize: 10,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
            }}
          >
            {paymentState === "verifying"
              ? "Verifying Payment..."
              : paymentState === "processing"
                ? "Processing..."
                : `Pay ₦${subtotal.toLocaleString("en-NG")}`}
          </button>
        </section>

        <aside style={{ flex: 2 }}>
          <div
            style={{
              backgroundColor: "var(--color-white)",
              border: "1px solid var(--color-linen)",
              padding: 28,
            }}
          >
            <p
              style={{
                margin: 0,
                marginBottom: 18,
                fontFamily: "var(--font-ui)",
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-smoke)",
              }}
            >
              Order Summary
            </p>
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.size}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                  fontFamily: "var(--font-ui)",
                  fontSize: 12,
                  color: "var(--color-graphite)",
                }}
              >
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>
                  ₦{(item.price * item.quantity).toLocaleString("en-NG")}
                </span>
              </div>
            ))}
            <div
              style={{
                height: 1,
                backgroundColor: "var(--color-linen)",
                margin: "12px 0",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 300,
                color: "var(--color-espresso)",
              }}
            >
              <span>Total</span>
              <span>₦{subtotal.toLocaleString("en-NG")}</span>
            </div>
            <div style={{ marginTop: 16 }}>
              <Link
                href="/cart"
                style={{
                  fontFamily: "var(--font-ui)",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-smoke)",
                  textDecoration: "none",
                }}
              >
                Back to Bag
              </Link>
            </div>
          </div>
        </aside>
      </main>
    </>
  );
}
