import type { ProductWithCollection } from '@/lib/data/products'
import { ProductCard } from '@/components/ui/ProductCard'
import { SectionHeader } from '@/components/ui/SectionHeader'

interface FeaturedProductsProps {
  products: ProductWithCollection[]
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section style={{ backgroundColor: 'var(--color-cream)', padding: '6rem 1.5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <SectionHeader
          label="Curated Edit"
          heading="Featured Pieces"
          subheading="Discover signature silhouettes crafted to command attention for every occasion."
          align="center"
        />
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              slug={product.slug}
              price={product.price}
              imageUrl={product.images?.[0]}
              category={product.category ?? product.collections?.name ?? undefined}
              badge={product.is_featured ? 'Featured' : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
