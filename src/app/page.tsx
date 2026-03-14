import { BrandStory } from '@/components/sections/BrandStory'
import { CollectionsStrip } from '@/components/sections/CollectionsStrip'
import { FeaturedProducts } from '@/components/sections/FeaturedProducts'
import { Hero } from '@/components/sections/Hero'
import { getCollections, getProducts } from '@/lib/data/products'

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
