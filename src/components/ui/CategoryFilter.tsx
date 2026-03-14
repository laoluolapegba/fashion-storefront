'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface CategoryFilterProps {
  categories: string[]
  active: string
}

export function CategoryFilter({ categories, active }: CategoryFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (!category || category === 'All') {
      params.delete('category')
    } else {
      params.set('category', category)
    }

    const queryString = params.toString()
    router.push(queryString ? `${pathname}?${queryString}` : pathname)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
        marginBottom: '2rem',
      }}
    >
      {categories.map((category) => {
        const isActive = active === category
        return (
          <button
            key={category}
            type="button"
            onClick={() => setCategory(category)}
            style={{
              border: '1px solid var(--color-espresso)',
              backgroundColor: isActive
                ? 'var(--color-espresso)'
                : 'transparent',
              color: isActive ? 'var(--color-cream)' : 'var(--color-espresso)',
              padding: '0.55rem 1rem',
              fontFamily: 'var(--font-ui)',
              fontSize: '10px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
