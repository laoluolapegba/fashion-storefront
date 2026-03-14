import Link from 'next/link'

export function Hero() {
  return (
    <section
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--color-espresso)',
        color: 'var(--color-cream)',
        padding: '7rem 1.5rem 2rem',
        display: 'grid',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              marginBottom: '1rem',
              color: 'var(--color-burnt-orange)',
              fontFamily: 'var(--font-ui)',
              fontSize: '9px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            Autumn / Winter 2026
          </p>
          <h1
            style={{
              margin: 0,
              marginBottom: '1.5rem',
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              fontSize: 'clamp(48px, 5vw, 72px)',
              lineHeight: 1,
            }}
          >
            Presence in Every
            <br />
            <span style={{ color: 'var(--color-burnt-orange)', fontStyle: 'italic' }}>
              Silhouette.
            </span>
          </h1>
          <p
            style={{
              margin: 0,
              marginBottom: '2rem',
              maxWidth: '560px',
              fontFamily: 'var(--font-ui)',
              fontSize: '14px',
              lineHeight: 1.8,
              color: 'var(--color-ash)',
            }}
          >
            Your style defines you. Eleven08 was created for that individual with
            a sense of deep heritage and style, who understands presence and
            isn&apos;t afraid to break new grounds.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link
              href="/shop"
              style={{
                backgroundColor: 'var(--color-burnt-orange)',
                color: 'var(--color-cream)',
                border: '1px solid var(--color-burnt-orange)',
                padding: '0.85rem 1.25rem',
                textDecoration: 'none',
                fontFamily: 'var(--font-ui)',
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
              }}
            >
              Shop Collection
            </Link>
            <Link
              href="/book-consultation"
              style={{
                backgroundColor: 'transparent',
                color: 'var(--color-cream)',
                border: '1px solid var(--color-ash)',
                padding: '0.85rem 1.25rem',
                textDecoration: 'none',
                fontFamily: 'var(--font-ui)',
                fontSize: '10px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
              }}
            >
              Book Styling
            </Link>
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '70vh',
            backgroundColor: 'var(--color-sand)',
            border: '1px solid var(--color-graphite)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <p
            style={{
              margin: 0,
              color: 'var(--color-smoke)',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '24px',
              fontWeight: 300,
            }}
          >
            Campaign Visual Placeholder
          </p>
        </div>
      </div>
      <p
        style={{
          margin: 0,
          marginTop: '2.5rem',
          textAlign: 'center',
          color: 'var(--color-ash)',
          fontFamily: 'var(--font-ui)',
          fontSize: '9px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}
      >
        Scroll to explore ↓
      </p>
    </section>
  )
}
