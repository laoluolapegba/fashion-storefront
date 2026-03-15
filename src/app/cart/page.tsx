"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, itemCount, subtotal, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "120px 24px 48px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--color-espresso)",
            }}
          >
            Your bag is empty.
          </h1>
          <p
            style={{
              margin: "10px 0 16px",
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "var(--color-smoke)",
            }}
          >
            Add your favourite Eleven08 pieces to continue.
          </p>
          <Link
            href="/shop"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-burnt-orange)",
              textDecoration: "none",
            }}
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "80px 48px",
        display: "flex",
        gap: 48,
      }}
    >
      <section style={{ flex: 2 }}>
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "baseline",
            marginBottom: 24,
          }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: "var(--font-display)",
              fontSize: 32,
              fontWeight: 300,
              color: "var(--color-espresso)",
            }}
          >
            Your Bag
          </h1>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-ui)",
              fontSize: 12,
              color: "var(--color-smoke)",
            }}
          >
            {itemCount} items
          </p>
        </div>

        <div>
          {items.map((item) => (
            <article
              key={`${item.productId}-${item.size}`}
              style={{
                borderBottom: "1px solid var(--color-linen)",
                padding: "16px 0",
                display: "flex",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  position: "relative",
                  backgroundColor: "var(--color-sand)",
                  flexShrink: 0,
                }}
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    sizes="80px"
                    style={{ objectFit: "cover" }}
                  />
                ) : null}
              </div>
              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    margin: 0,
                    marginBottom: 4,
                    fontFamily: "var(--font-display)",
                    fontSize: 18,
                    fontWeight: 300,
                    color: "var(--color-espresso)",
                  }}
                >
                  {item.name}
                </h2>
                <p
                  style={{
                    margin: 0,
                    marginBottom: 8,
                    fontFamily: "var(--font-ui)",
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-smoke)",
                  }}
                >
                  Size: {item.size}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: "var(--font-ui)",
                    fontSize: 13,
                    color: "var(--color-graphite)",
                  }}
                >
                  ₦{item.price.toLocaleString("en-NG")}
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  alignContent: "space-between",
                  justifyItems: "end",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    border: "1px solid var(--color-linen)",
                  }}
                >
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.size,
                        item.quantity - 1,
                      )
                    }
                    style={{
                      border: 0,
                      backgroundColor: "transparent",
                      width: 30,
                      height: 30,
                      color: "var(--color-espresso)",
                    }}
                  >
                    −
                  </button>
                  <span
                    style={{
                      width: 34,
                      height: 30,
                      display: "grid",
                      placeItems: "center",
                      fontFamily: "var(--font-ui)",
                      fontSize: 12,
                      color: "var(--color-espresso)",
                    }}
                  >
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      updateQuantity(
                        item.productId,
                        item.size,
                        item.quantity + 1,
                      )
                    }
                    style={{
                      border: 0,
                      backgroundColor: "transparent",
                      width: 30,
                      height: 30,
                      color: "var(--color-espresso)",
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.productId, item.size)}
                  style={{
                    border: 0,
                    backgroundColor: "transparent",
                    padding: 0,
                    fontFamily: "var(--font-ui)",
                    fontSize: 9,
                    textTransform: "uppercase",
                    letterSpacing: "0.2em",
                    color: "var(--color-smoke)",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside style={{ flex: 1 }}>
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
              fontFamily: "var(--font-ui)",
              fontSize: 13,
              color: "var(--color-graphite)",
            }}
          >
            <span>Subtotal</span>
            <span>₦{subtotal.toLocaleString("en-NG")}</span>
          </div>
          <p
            style={{
              margin: 0,
              marginBottom: 14,
              fontFamily: "var(--font-ui)",
              fontSize: 12,
              color: "var(--color-smoke)",
            }}
          >
            Shipping: Calculated at checkout
          </p>
          <div
            style={{
              height: 1,
              backgroundColor: "var(--color-linen)",
              marginBottom: 14,
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 300,
                color: "var(--color-espresso)",
              }}
            >
              Total
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 24,
                fontWeight: 300,
                color: "var(--color-espresso)",
              }}
            >
              ₦{subtotal.toLocaleString("en-NG")}
            </span>
          </div>
          <Link
            href="/checkout"
            style={{
              display: "block",
              width: "100%",
              textAlign: "center",
              backgroundColor: "var(--color-burnt-orange)",
              border: "1px solid var(--color-burnt-orange)",
              color: "var(--color-cream)",
              textDecoration: "none",
              padding: "13px 10px",
              fontFamily: "var(--font-ui)",
              fontSize: 10,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
            }}
          >
            Proceed to Checkout
          </Link>
          <div style={{ textAlign: "center", marginTop: 14 }}>
            <Link
              href="/shop"
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 10,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-smoke)",
                textDecoration: "none",
              }}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </aside>
    </main>
  );
}
