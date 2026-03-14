//src/lib/data/products.ts
import { createSupabaseServerClient } from '@/lib/supabase/server'

export async function getProducts(opts?: {
    category?: string
    featured?: boolean
    limit?: number
}) {
    const supabase = await createSupabaseServerClient()
    let query = supabase
        .from('products')
        .select('*, collections(name, slug)')
        .eq('is_active', true)
        .order('created_at', { ascending: false })

    if (opts?.category) query = query.eq('category', opts.category)
    if (opts?.featured) query = query.eq('is_featured', true)
    if (opts?.limit) query = query.limit(opts.limit)

    const { data, error } = await query
    if (error) throw error
    return data
}

export async function getProductBySlug(slug: string) {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
        .from('products')
        .select('*, collections(name, slug)')
        .eq('slug', slug)
        .eq('is_active', true)
        .single()
    if (error) return null
    return data
}

export async function getCollections() {
    const supabase = await createSupabaseServerClient()
    const { data, error } = await supabase
        .from('collections')
        .select('*')
        .eq('is_active', true)
    if (error) throw error
    return data
}