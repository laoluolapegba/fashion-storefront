"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Shop", href: "/shop" },
  { label: "Collections", href: "/collections" },
  { label: "Aso-Ebi", href: "/aso-ebi" },
  { label: "Custom Order", href: "/custom-order" },
  { label: "About", href: "/about" },
  { label: "Bag", href: "/cart" },
];

export function Navbar() {
  const { itemCount } = useCart();

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "var(--color-cream)",
        borderBottom: "1px solid var(--color-linen)",
        height: 64,
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 48px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 22,
            fontWeight: 300,
            letterSpacing: "0.12em",
            color: "var(--color-espresso)",
            textDecoration: "none",
          }}
        >
          ELEVEN08
        </Link>

        <nav style={{ display: "flex", gap: 32 }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 10,
                fontWeight: 400,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-smoke)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <Link
            href="/book-consultation"
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: 10,
              fontWeight: 400,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-espresso)",
              textDecoration: "none",
              padding: "8px 20px",
              border: "1px solid var(--color-espresso)",
            }}
          >
            Book Styling
          </Link>

          <Link
            href="/cart"
            aria-label="Open shopping bag"
            style={{
              position: "relative",
              color: "var(--color-espresso)",
              display: "inline-flex",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 8.5V6.5C7 3.9 9 2 12 2C15 2 17 3.9 17 6.5V8.5"
                stroke="currentColor"
                strokeWidth="1.4"
              />
              <path
                d="M4 8.5H20L19 22H5L4 8.5Z"
                stroke="currentColor"
                strokeWidth="1.4"
              />
            </svg>
            {itemCount > 0 ? (
              <span
                style={{
                  position: "absolute",
                  top: -4,
                  right: -8,
                  minWidth: 15,
                  height: 15,
                  padding: "0 4px",
                  backgroundColor: "var(--color-burnt-orange)",
                  color: "var(--color-white)",
                  fontFamily: "var(--font-ui)",
                  fontSize: 9,
                  letterSpacing: "0.05em",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                {itemCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </header>
  );
}
