'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { ProductWithCollection } from '@/lib/data/products'

interface ProductInfoProps {
  product: ProductWithCollection
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [added, setAdded] = useState(false)

  const sizes = product.sizes?.length
    ? product.sizes
    : ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL']

  const onAdd = () => {
    if (!selectedSize) return
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div>
      <p style={{ margin: 0, marginBottom: '0.85rem', fontFamily: 'var(--font-ui)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-smoke)' }}>
        {product.collections?.name ?? 'Shop'} / {product.name}
      </p>
      <h1 style={{ margin: 0, marginBottom: '0.75rem', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '36px', color: 'var(--color-espresso)' }}>
        {product.name}
      </h1>
      <p style={{ margin: 0, marginBottom: '1.2rem', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '26px', color: 'var(--color-graphite)' }}>
        ₦{product.price.toLocaleString('en-NG')}
      </p>
      <div style={{ height: '1px', backgroundColor: 'var(--color-linen)', marginBottom: '1.2rem' }} />

      <p style={{ margin: 0, marginBottom: '0.6rem', fontFamily: 'var(--font-ui)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-smoke)' }}>
        Select Size
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.2rem' }}>
        {sizes.map((size) => {
          const isActive = selectedSize === size
          return (
            <button
              key={size}
              type="button"
              onClick={() => setSelectedSize(size)}
              style={{
                minWidth: '42px',
                minHeight: '42px',
                border: '1px solid var(--color-espresso)',
                backgroundColor: isActive ? 'var(--color-espresso)' : 'transparent',
                color: isActive ? 'var(--color-cream)' : 'var(--color-espresso)',
                fontFamily: 'var(--font-ui)',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
            >
              {size}
            </button>
          )
        })}
      </div>

      <button
        type="button"
        onClick={onAdd}
        disabled={!selectedSize || added}
        style={{
          width: '100%',
          border: '1px solid var(--color-burnt-orange)',
          backgroundColor: selectedSize ? 'var(--color-burnt-orange)' : 'var(--color-linen)',
          color: selectedSize ? 'var(--color-cream)' : 'var(--color-smoke)',
          padding: '0.95rem 1rem',
          fontFamily: 'var(--font-ui)',
          fontSize: '10px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          cursor: selectedSize ? 'pointer' : 'not-allowed',
          marginBottom: '0.75rem',
        }}
      >
        {added ? 'Added ✓' : 'Add to Cart'}
      </button>

      <Link
        href="/book-consultation"
        style={{
          display: 'inline-block',
          width: '100%',
          textAlign: 'center',
          border: '1px solid var(--color-espresso)',
          color: 'var(--color-espresso)',
          textDecoration: 'none',
          padding: '0.95rem 1rem',
          fontFamily: 'var(--font-ui)',
          fontSize: '10px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '1.2rem',
        }}
      >
        Book a Styling Consultation
      </Link>

      <div style={{ height: '1px', backgroundColor: 'var(--color-linen)', marginBottom: '1.2rem' }} />
      <p style={{ margin: 0, marginBottom: '1rem', color: 'var(--color-smoke)', fontFamily: 'var(--font-ui)', lineHeight: 1.8, fontSize: '14px' }}>
        {product.description ?? 'An elevated Eleven08 original crafted for lasting elegance and confidence.'}
      </p>
      <div style={{ borderLeft: '3px solid var(--color-burnt-orange)', backgroundColor: 'var(--color-sand)', padding: '0.9rem 1rem' }}>
        <p style={{ margin: 0, marginBottom: '0.35rem', fontFamily: 'var(--font-ui)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-smoke)' }}>
          Delivery
        </p>
        <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: '13px', color: 'var(--color-graphite)', lineHeight: 1.6 }}>
          RTW: 2–5 working days · Custom: 7–14 working days · International delivery on request.
        </p>
      </div>
    </div>
  )
}
