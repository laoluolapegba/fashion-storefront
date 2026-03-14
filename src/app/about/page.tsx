import Link from 'next/link'

const values = [
  {
    title: 'Heritage',
    body: 'Our silhouettes are rooted in culture, memory, and deeply African expression.',
  },
  {
    title: 'Craft',
    body: 'From cut to finishing, every piece is refined with detail-first workmanship.',
  },
  {
    title: 'Presence',
    body: 'We design for individuals who move with confidence and clear personal style.',
  },
]

const infoCards = [
  ['RTW Production', '2–5 working days'],
  ['Custom Production', '7–14 working days'],
  ['Delivery', 'Lagos same/next day · Nationwide'],
  ['International', 'Delivery available on request'],
]

export default function AboutPage() {
  return (
    <main>
      <section style={{ backgroundColor: 'var(--color-espresso)', color: 'var(--color-cream)', padding: '7rem 1.5rem 5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, marginBottom: '1rem', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '52px', lineHeight: 1.05 }}>
              Eleven08 is a house of style, story, and
              <span style={{ color: 'var(--color-burnt-orange)', fontStyle: 'italic' }}> modern heritage.</span>
            </h1>
            <p style={{ margin: 0, color: 'var(--color-ash)', fontFamily: 'var(--font-ui)', fontSize: '14px', lineHeight: 1.9, maxWidth: '620px' }}>
              Eleven08 was created for that individual with a sense of deep heritage and style, who understands presence and isn&apos;t afraid to break new grounds. Your style defines you.
            </p>
          </div>
          <div style={{ width: '100%', aspectRatio: '4 / 5', border: '1px solid var(--color-graphite)', backgroundColor: 'var(--color-sand)', display: 'grid', placeItems: 'center' }}>
            <p style={{ margin: 0, color: 'var(--color-smoke)', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 300, fontSize: '24px' }}>Atelier Placeholder</p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-cream)', padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {values.map((value) => (
            <article key={value.title} style={{ border: '1px solid var(--color-linen)', padding: '1.2rem' }}>
              <h2 style={{ margin: 0, marginBottom: '0.6rem', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '30px', color: 'var(--color-espresso)' }}>{value.title}</h2>
              <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: '13px', color: 'var(--color-smoke)', lineHeight: 1.8 }}>{value.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-sand)', padding: '0 1.5rem 5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(2, minmax(220px, 1fr))', gap: '1rem' }}>
          {infoCards.map(([title, body]) => (
            <article key={title} style={{ border: '1px solid var(--color-warm-nude)', padding: '1rem' }}>
              <p style={{ margin: 0, marginBottom: '0.4rem', fontFamily: 'var(--font-ui)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-smoke)' }}>{title}</p>
              <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '28px', color: 'var(--color-espresso)' }}>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section style={{ backgroundColor: 'var(--color-burnt-orange)', padding: '2.5rem 1.5rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          <p style={{ margin: 0, color: 'var(--color-cream)', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '34px' }}>
            Your style defines you.
          </p>
          <Link href="/book-consultation" style={{ textDecoration: 'none', border: '1px solid var(--color-cream)', color: 'var(--color-cream)', padding: '0.85rem 1.2rem', fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            Book Consultation
          </Link>
        </div>
      </section>
    </main>
  )
}
