import Image from 'next/image'
import Link from 'next/link'

interface ProductCardProps {
  id: string
  name: string
  slug: string
  price: number
  imageUrl?: string
  badge?: string
  category?: string
}

export function ProductCard({
  name,
  slug,
  price,
  imageUrl,
  badge,
  category,
}: ProductCardProps) {
  return (
    <Link
      href={`/shop/${slug}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <article style={{ border: '1px solid var(--color-linen)' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '3 / 4',
            backgroundColor: 'var(--color-sand)',
            overflow: 'hidden',
          }}
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'var(--color-smoke)',
                }}
              >
                Eleven08
              </span>
            </div>
          )}
          {badge && (
            <span
              style={{
                position: 'absolute',
                top: '0.75rem',
                left: '0.75rem',
                backgroundColor: 'var(--color-burnt-orange)',
                color: 'var(--color-cream)',
                fontFamily: 'var(--font-ui)',
                fontSize: '9px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '0.3rem 0.55rem',
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <div style={{ padding: '1rem 0.9rem 1.1rem' }}>
          {category && (
            <p
              style={{
                margin: 0,
                marginBottom: '0.4rem',
                fontFamily: 'var(--font-ui)',
                fontSize: '8px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--color-smoke)',
              }}
            >
              {category}
            </p>
          )}
          <h3
            style={{
              margin: 0,
              marginBottom: '0.5rem',
              fontFamily: 'var(--font-display)',
              fontSize: '17px',
              fontWeight: 300,
              color: 'var(--color-espresso)',
            }}
          >
            {name}
          </h3>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-ui)',
              fontSize: '12px',
              letterSpacing: '0.06em',
              color: 'var(--color-graphite)',
            }}
          >
            ₦{price.toLocaleString('en-NG')}
          </p>
        </div>
      </article>
    </Link>
  )
}
