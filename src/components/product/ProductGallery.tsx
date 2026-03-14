'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProductGalleryProps {
  images: string[]
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const safeImages = images.length ? images : ['']
  const [activeIndex, setActiveIndex] = useState(0)
  const activeImage = safeImages[activeIndex] ?? ''

  return (
    <div style={{ display: 'grid', gridTemplateColumns: safeImages.length > 1 ? '64px 1fr' : '1fr', gap: '0.75rem' }}>
      {safeImages.length > 1 && (
        <div style={{ display: 'grid', gap: '0.5rem' }}>
          {safeImages.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              style={{
                width: '64px',
                height: '80px',
                border: `1px solid ${index === activeIndex ? 'var(--color-espresso)' : 'var(--color-linen)'}`,
                backgroundColor: 'var(--color-sand)',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
              }}
            >
              {image ? (
                <Image
                  src={image}
                  alt={`${name} preview ${index + 1}`}
                  fill
                  sizes="64px"
                  style={{ objectFit: 'cover' }}
                />
              ) : null}
            </button>
          ))}
        </div>
      )}

      <div
        style={{
          width: '100%',
          aspectRatio: '4 / 5',
          backgroundColor: 'var(--color-sand)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {activeImage ? (
          <Image
            src={activeImage}
            alt={name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            style={{ objectFit: 'cover' }}
          />
        ) : (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'var(--color-smoke)', fontWeight: 300 }}>
              Eleven08
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
