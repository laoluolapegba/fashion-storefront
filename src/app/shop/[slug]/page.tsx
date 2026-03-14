import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ProductGallery } from '@/components/product/ProductGallery'
import { ProductInfo } from '@/components/product/ProductInfo'
import { getProductBySlug, getProducts } from '@/lib/data/products'

type ParamsInput = { slug: string } | Promise<{ slug: string }>

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: ParamsInput
}): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    return { title: 'Product Not Found' }
  }

  return {
    title: product.name,
    description:
      product.description ??
      `Shop ${product.name} from Eleven08 ready-to-wear and custom collections.`,
  }
}

export default async function ProductPage({ params }: { params: ParamsInput }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <main style={{ padding: '7rem 1.5rem 5rem' }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
        }}
      >
        <ProductGallery images={product.images ?? []} name={product.name} />
        <ProductInfo product={product} />
      </div>
    </main>
  )
}
