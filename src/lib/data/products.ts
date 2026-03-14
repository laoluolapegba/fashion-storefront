import { createSupabaseServerClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database.types'

type ProductRow = Database['public']['Tables']['products']['Row']
type CollectionRow = Database['public']['Tables']['collections']['Row']

export type ProductWithCollection = ProductRow & {
  collections: Pick<CollectionRow, 'name' | 'slug'> | null
}

export async function getProducts(opts?: {
  category?: string
  featured?: boolean
  limit?: number
}): Promise<ProductWithCollection[]> {
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from('products')
    .select('*, collections(name, slug)')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (opts?.category) {
    query = query.eq('category', opts.category)
  }

  if (opts?.featured) {
    query = query.eq('is_featured', true)
  }

  if (opts?.limit) {
    query = query.limit(opts.limit)
  }

  const { data, error } = await query

  if (error || !data) {
    return []
  }

  return data as ProductWithCollection[]
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductWithCollection | null> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('products')
    .select('*, collections(name, slug)')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !data) {
    return null
  }

  return data as ProductWithCollection
}

export async function getCollections(): Promise<CollectionRow[]> {
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error || !data) {
    return []
  }

  return data
}
