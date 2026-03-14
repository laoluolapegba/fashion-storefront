import { getProducts } from '@/lib/data/products'

const CATEGORIES = [
    'All', 'Luxury Kaftans', 'Statement Dresses',
    'Elegant Two-Piece Sets', 'Occasion Wear',
    'Limited Collection Pieces', 'Aso-Ebi',
]

export default async function ShopPage({
    searchParams
}: {
    searchParams: { category?: string }
}) {
    const category = searchParams.category !== 'All'
        ? searchParams.category
        : undefined

    const products = await getProducts({ category })

    return (
        <main>
            <CategoryFilter categories={CATEGORIES} active={searchParams.category} />
            <ProductGrid products={products} />
        </main>
    )
}
