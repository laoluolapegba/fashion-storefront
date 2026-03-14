'use client'

import Link from 'next/link'
import { useState } from 'react'
import { submitInquiry } from '@/app/actions/forms'

export default function ContactPage() {
  const [pending, setPending] = useState(false)
  const [result, setResult] = useState<{ success: boolean; error?: string } | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setPending(true)
    const response = await submitInquiry(formData)
    setResult(response)
    setPending(false)
  }

  return (
    <main style={{ padding: '7rem 1.5rem 5rem' }}>
      <div style={{ maxWidth: '1180px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        <section>
          <p style={{ margin: 0, marginBottom: '0.7rem', fontFamily: 'var(--font-ui)', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-burnt-orange)' }}>Contact</p>
          <h1 style={{ margin: 0, marginBottom: '1rem', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '48px', color: 'var(--color-espresso)' }}>Let&apos;s Style Your Next Moment.</h1>
          <p style={{ margin: 0, marginBottom: '1rem', fontFamily: 'var(--font-ui)', color: 'var(--color-smoke)', lineHeight: 1.8 }}>
            WhatsApp: <Link href="https://wa.me/2347030000117" style={{ color: 'var(--color-espresso)' }}>+234 703 000 0117</Link>
          </p>
          <p style={{ margin: 0, marginBottom: '0.6rem', fontFamily: 'var(--font-ui)', color: 'var(--color-smoke)' }}>Instagram: @eleven08_rtw</p>
          <p style={{ margin: 0, fontFamily: 'var(--font-ui)', color: 'var(--color-smoke)' }}>TikTok: @eleven0898</p>
        </section>

        <section style={{ border: '1px solid var(--color-linen)', padding: '1.2rem' }}>
          {result?.success ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <h2 style={{ margin: 0, marginBottom: '0.75rem', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '36px' }}>Message Received</h2>
              <p style={{ margin: 0, fontFamily: 'var(--font-ui)', color: 'var(--color-smoke)' }}>Thank you for reaching out. Our team will respond shortly.</p>
            </div>
          ) : (
            <form action={handleSubmit} style={{ display: 'grid', gap: '0.8rem' }}>
              <input name="full_name" required placeholder="Full name" />
              <input name="email" type="email" required placeholder="Email" />
              <input name="phone" placeholder="Phone" />
              <input name="subject" placeholder="Subject" />
              <textarea name="message" required placeholder="Message" rows={5} />
              {result?.error ? <p style={{ margin: 0, color: 'var(--color-error)', fontSize: '12px' }}>{result.error}</p> : null}
              <button type="submit" disabled={pending} style={{ border: '1px solid var(--color-burnt-orange)', backgroundColor: 'var(--color-burnt-orange)', color: 'var(--color-cream)', padding: '0.9rem 1rem', fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer' }}>
                {pending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}
