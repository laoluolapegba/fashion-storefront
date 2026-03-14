import Link from 'next/link'
import { ProductCard } from '@/components/ui/ProductCard'
import { getProducts } from '@/lib/data/products'

const processSteps = [
  { id: '01', title: 'Share Theme', body: 'Tell us your event palette, guest count, and preferred silhouette direction.' },
  { id: '02', title: 'Select Fabrics', body: 'Choose premium fabric options curated for your celebration and budget.' },
  { id: '03', title: 'Approve Design', body: 'Review sketches and fitting details before production begins.' },
  { id: '04', title: 'Delivery', body: 'Receive ready-to-wear or custom pieces in time for your event.' },
]

export default async function AsoEbiPage() {
  const products = await getProducts({ category: 'Aso-Ebi' })

  return (
    <main>
      <section style={{ backgroundColor: 'var(--color-espresso)', color: 'var(--color-cream)', padding: '7rem 1.5rem 5rem' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <p style={{ margin: 0, marginBottom: '0.8rem', color: 'var(--color-burnt-orange)', fontFamily: 'var(--font-ui)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            Aso-Ebi
          </p>
          <h1 style={{ margin: 0, marginBottom: '1rem', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '54px', lineHeight: 1.03 }}>
            Elevated ceremony style,
            <span style={{ color: 'var(--color-burnt-orange)', fontStyle: 'italic' }}> tailored for your moment.</span>
          </h1>
          <Link href="/contact" style={{ display: 'inline-block', textDecoration: 'none', border: '1px solid var(--color-burnt-orange)', backgroundColor: 'var(--color-burnt-orange)', color: 'var(--color-cream)', padding: '0.85rem 1.2rem', fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            Enquire Now
          </Link>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-cream)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {processSteps.map((step) => (
            <article key={step.id} style={{ border: '1px solid var(--color-linen)', padding: '1rem' }}>
              <p style={{ margin: 0, marginBottom: '0.5rem', fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-burnt-orange)' }}>{step.id}</p>
              <h2 style={{ margin: 0, marginBottom: '0.5rem', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '28px', color: 'var(--color-espresso)' }}>{step.title}</h2>
              <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: '13px', color: 'var(--color-smoke)', lineHeight: 1.7 }}>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-cream)', padding: '0 1.5rem 5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {products.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {products.map((product) => (
                <ProductCard key={product.id} id={product.id} name={product.name} slug={product.slug} price={product.price} imageUrl={product.images?.[0]} category={product.category ?? undefined} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', border: '1px solid var(--color-linen)', padding: '3rem 1rem' }}>
              <p style={{ margin: 0, marginBottom: '1rem', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '36px', color: 'var(--color-espresso)' }}>
                New Aso-Ebi drops coming soon.
              </p>
              <Link href="/custom-order" style={{ display: 'inline-block', textDecoration: 'none', border: '1px solid var(--color-espresso)', color: 'var(--color-espresso)', padding: '0.8rem 1.1rem', fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
                Start a Custom Aso-Ebi Order
              </Link>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
