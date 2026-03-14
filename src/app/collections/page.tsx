import Image from 'next/image'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getCollections } from '@/lib/data/products'

const fallbackCollections = [
  {
    name: 'Luxury Kaftans',
    slug: 'luxury-kaftans',
    description: 'Flowing forms tailored with premium finishing and quiet drama.',
    image_url: null,
  },
  {
    name: 'Statement Dresses',
    slug: 'statement-dresses',
    description: 'Sculptural lines for entrances that leave lasting impressions.',
    image_url: null,
  },
  {
    name: 'Elegant Two-Piece Sets',
    slug: 'elegant-two-piece-sets',
    description: 'Versatile pairings from daytime polish to evening ease.',
    image_url: null,
  },
  {
    name: 'Occasion Wear',
    slug: 'occasion-wear',
    description: 'Celebration-ready pieces designed for standout moments.',
    image_url: null,
  },
  {
    name: 'Limited Collection Pieces',
    slug: 'limited-collection-pieces',
    description: 'Small-batch pieces for women who value rarity and identity.',
    image_url: null,
  },
  {
    name: 'Aso-Ebi',
    slug: 'aso-ebi',
    description: 'Cultural elegance interpreted for modern ceremonies.',
    image_url: null,
  },
]

export default async function CollectionsPage() {
  const collections = await getCollections()
  const items = collections.length ? collections : fallbackCollections

  return (
    <main style={{ padding: '7rem 1.5rem 5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <SectionHeader
          label="Collections"
          heading="Signature Collection Lines"
          subheading="Explore every Eleven08 category — designed to celebrate heritage, confidence, and personal expression."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1rem',
          }}
        >
          {items.map((collection) => (
            <article key={collection.slug} style={{ border: '1px solid var(--color-linen)', backgroundColor: 'var(--color-cream)' }}>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 3', backgroundColor: 'var(--color-sand)' }}>
                {collection.image_url ? (
                  <Image
                    src={collection.image_url}
                    alt={collection.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
                    <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, color: 'var(--color-smoke)' }}>
                      {collection.name}
                    </p>
                  </div>
                )}
              </div>
              <div style={{ padding: '1.2rem' }}>
                <div style={{ width: '56px', height: '2px', backgroundColor: 'var(--color-burnt-orange)', marginBottom: '0.9rem' }} />
                <h2 style={{ margin: 0, marginBottom: '0.7rem', fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 300, color: 'var(--color-espresso)' }}>
                  {collection.name}
                </h2>
                <p style={{ margin: 0, marginBottom: '1rem', fontFamily: 'var(--font-ui)', fontSize: '13px', lineHeight: 1.7, color: 'var(--color-smoke)' }}>
                  {collection.description ?? 'Explore this curated Eleven08 collection.'}
                </p>
                <Link
                  href={collection.slug === 'aso-ebi' ? '/aso-ebi' : `/shop?category=${encodeURIComponent(collection.name)}`}
                  style={{ textDecoration: 'none', color: 'var(--color-burnt-orange)', fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase' }}
                >
                  Shop →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
