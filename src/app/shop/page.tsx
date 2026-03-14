import { ProductCard } from '@/components/ui/ProductCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CategoryFilter } from '@/components/ui/CategoryFilter'
import { getProducts } from '@/lib/data/products'

const categories = [
  'All',
  'Luxury Kaftans',
  'Statement Dresses',
  'Elegant Two-Piece Sets',
  'Occasion Wear',
  'Limited Collection Pieces',
  'Aso-Ebi',
]

type SearchParamsInput =
  | { category?: string }
  | Promise<{ category?: string }>

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParamsInput
}) {
  const params = await searchParams
  const activeCategory = params.category ?? 'All'
  const products = await getProducts({
    category: activeCategory === 'All' ? undefined : activeCategory,
  })

  return (
    <main style={{ padding: '7rem 1.5rem 5rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <SectionHeader
          label="Shop"
          heading="The Eleven08 Edit"
          subheading="Luxury Kaftans · Statement Dresses · Elegant Two-Piece Sets · Occasion Wear · Limited Collection Pieces · Aso-Ebi"
        />
        <CategoryFilter categories={categories} active={activeCategory} />

        {products.length === 0 ? (
          <div style={{ padding: '4rem 1rem', textAlign: 'center' }}>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 300,
                fontSize: '36px',
                color: 'var(--color-espresso)',
              }}
            >
              No pieces found for this category yet.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
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
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
