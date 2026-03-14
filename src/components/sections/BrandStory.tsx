import Link from 'next/link'

export function BrandStory() {
  return (
    <section style={{ backgroundColor: 'var(--color-cream)', padding: '6rem 1.5rem' }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            aspectRatio: '4 / 5',
            border: '1px solid var(--color-linen)',
            backgroundColor: 'var(--color-sand)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--color-smoke)',
            }}
          >
            Brand Story Image
          </p>
        </div>

        <div>
          <div
            style={{
              width: '56px',
              height: '2px',
              backgroundColor: 'var(--color-burnt-orange)',
              marginBottom: '1rem',
            }}
          />
          <p
            style={{
              margin: 0,
              marginBottom: '0.8rem',
              color: 'var(--color-burnt-orange)',
              fontFamily: 'var(--font-ui)',
              fontSize: '9px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            Eleven08 Heritage
          </p>
          <h2
            style={{
              margin: 0,
              marginBottom: '1rem',
              color: 'var(--color-espresso)',
              fontFamily: 'var(--font-display)',
              fontSize: '42px',
              fontWeight: 300,
              lineHeight: 1.1,
            }}
          >
            Crafted for Presence,
            <br />
            <span style={{ color: 'var(--color-burnt-orange)', fontStyle: 'italic' }}>
              Designed for Identity.
            </span>
          </h2>
          <p
            style={{
              margin: 0,
              marginBottom: '1.5rem',
              color: 'var(--color-smoke)',
              fontFamily: 'var(--font-ui)',
              fontSize: '14px',
              lineHeight: 1.8,
            }}
          >
            Eleven08 was created for that individual with a sense of deep
            heritage and style, who understands presence and isn&apos;t afraid to
            break new grounds.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', marginBottom: '1.5rem' }}>
            {[
              ['RTW', '2–5 Days'],
              ['Custom', '7–14 Days'],
              ['Sizing', 'XS–XXXL'],
            ].map(([label, value]) => (
              <div key={label} style={{ border: '1px solid var(--color-linen)', padding: '0.8rem' }}>
                <p style={{ margin: 0, marginBottom: '0.3rem', fontFamily: 'var(--font-ui)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-smoke)' }}>{label}</p>
                <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '20px', color: 'var(--color-espresso)' }}>{value}</p>
              </div>
            ))}
          </div>
          <Link
            href="/about"
            style={{
              color: 'var(--color-espresso)',
              textDecoration: 'underline',
              textUnderlineOffset: '0.3rem',
              fontFamily: 'var(--font-ui)',
              fontSize: '10px',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
            }}
          >
            Read Our Story
          </Link>
        </div>
      </div>
    </section>
  )
}
