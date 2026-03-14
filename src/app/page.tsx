import { getProducts, getCollections } from '@/lib/data/products'
import { Hero } from '@/components/sections/Hero'
import { FeaturedProducts } from '@/components/sections/FeaturedProducts'
import { CollectionsStrip } from '@/components/sections/CollectionsStrip'
import { BrandStory } from '@/components/sections/BrandStory'

export default async function HomePage() {
    const [featured, collections] = await Promise.all([
        getProducts({ featured: true, limit: 4 }),
        getCollections(),
    ])

    return (
        <main>
            <Hero />
            <FeaturedProducts products={featured} />
            <CollectionsStrip collections={collections} />
            <BrandStory />
        </main>
    )
}