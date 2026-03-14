import Link from 'next/link'
import type { Database } from '@/types/database.types'

const fallbackCollections = [
  {
    name: 'Luxury Kaftans',
    slug: 'luxury-kaftans',
    description: 'Flowing forms tailored with premium finishing and quiet drama.',
  },
  {
    name: 'Statement Dresses',
    slug: 'statement-dresses',
    description: 'Sculptural lines for entrances that leave lasting impressions.',
  },
  {
    name: 'Elegant Two-Piece Sets',
    slug: 'elegant-two-piece-sets',
    description: 'Versatile pairings to move from daytime polish to evening ease.',
  },
  {
    name: 'Occasion Wear',
    slug: 'occasion-wear',
    description: 'Celebration-ready pieces designed for standout moments.',
  },
  {
    name: 'Limited Collection Pieces',
    slug: 'limited-collection-pieces',
    description: 'Small-batch pieces for the woman who values rarity and identity.',
  },
  {
    name: 'Aso-Ebi',
    slug: 'aso-ebi',
    description: 'Cultural elegance reinterpreted for modern ceremonies.',
  },
]

type Collection = Database['public']['Tables']['collections']['Row']

interface CollectionsStripProps {
  collections: Collection[]
}

export function CollectionsStrip({ collections }: CollectionsStripProps) {
  const collectionItems = collections.length
    ? collections.map((item) => ({
        name: item.name,
        slug: item.slug,
        description: item.description ?? 'Shop the latest edit from this collection.',
      }))
    : fallbackCollections

  return (
    <section style={{ backgroundColor: 'var(--color-espresso)', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
          }}
        >
          {collectionItems.map((collection) => (
            <Link
              key={collection.slug}
              href={collection.slug === 'aso-ebi' ? '/aso-ebi' : `/shop?category=${encodeURIComponent(collection.name)}`}
              style={{
                border: '1px solid var(--color-graphite)',
                textDecoration: 'none',
                padding: '1.5rem',
                backgroundColor: 'transparent',
                transition: 'background-color 180ms ease',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '2px',
                  backgroundColor: 'var(--color-burnt-orange)',
                  marginBottom: '1rem',
                }}
              />
              <h3
                style={{
                  margin: 0,
                  marginBottom: '0.75rem',
                  color: 'var(--color-cream)',
                  fontFamily: 'var(--font-display)',
                  fontSize: '30px',
                  fontWeight: 300,
                }}
              >
                {collection.name}
              </h3>
              <p
                style={{
                  margin: 0,
                  marginBottom: '1rem',
                  color: 'var(--color-smoke)',
                  fontFamily: 'var(--font-ui)',
                  lineHeight: 1.7,
                  fontSize: '13px',
                }}
              >
                {collection.description}
              </p>
              <p
                style={{
                  margin: 0,
                  color: 'var(--color-burnt-orange)',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '10px',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                }}
              >
                Shop →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
