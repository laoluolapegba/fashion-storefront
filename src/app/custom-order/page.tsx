'use client'

import { useState } from 'react'
import { submitCustomOrder } from '@/app/actions/forms'

export default function CustomOrderPage() {
  const [pending, setPending] = useState(false)
  const [result, setResult] = useState<{ success: boolean; error?: string } | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setPending(true)
    const response = await submitCustomOrder(formData)
    setResult(response)
    setPending(false)
  }

  return (
    <main style={{ padding: '7rem 1.5rem 5rem' }}>
      <div style={{ maxWidth: '840px', margin: '0 auto' }}>
        <h1 style={{ margin: 0, marginBottom: '0.8rem', fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 300, color: 'var(--color-espresso)' }}>Custom Order Request</h1>
        <p style={{ margin: 0, marginBottom: '1.2rem', fontFamily: 'var(--font-ui)', color: 'var(--color-smoke)', lineHeight: 1.8 }}>
          Share your vision and we&apos;ll guide you through the Eleven08 custom process. Custom orders typically require 7–14 working days.
        </p>

        <section style={{ border: '1px solid var(--color-linen)', padding: '1.2rem' }}>
          {result?.success ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <h2 style={{ margin: 0, marginBottom: '0.75rem', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '36px' }}>Request Submitted</h2>
              <p style={{ margin: 0, fontFamily: 'var(--font-ui)', color: 'var(--color-smoke)' }}>Thank you. Our team will review your details and reach out with next steps.</p>
            </div>
          ) : (
            <form action={handleSubmit} style={{ display: 'grid', gap: '0.8rem' }}>
              <input name="full_name" required placeholder="Full name" />
              <input name="email" type="email" required placeholder="Email" />
              <input name="phone" required placeholder="Phone" />
              <input name="design_reference" placeholder="Design reference link / notes" />
              <input name="fabric_preference" placeholder="Fabric preference" />
              <input name="occasion" placeholder="Occasion" />
              <input name="event_date" type="date" />
              <input name="delivery_timeline" placeholder="Preferred delivery timeline" />

              <div style={{ border: '1px solid var(--color-linen)', padding: '0.8rem' }}>
                <p style={{ margin: 0, marginBottom: '0.6rem', fontFamily: 'var(--font-ui)', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-smoke)' }}>Measurements</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem' }}>
                  <input name="bust" placeholder="Bust" />
                  <input name="waist" placeholder="Waist" />
                  <input name="hips" placeholder="Hips" />
                  <input name="height" placeholder="Height" />
                </div>
                <textarea name="measurement_notes" rows={3} placeholder="Additional measurement notes" style={{ marginTop: '0.7rem' }} />
              </div>

              <p style={{ margin: 0, fontFamily: 'var(--font-ui)', fontSize: '12px', color: 'var(--color-smoke)' }}>
                Final design approval is required before production begins.
              </p>

              {result?.error ? <p style={{ margin: 0, color: 'var(--color-error)', fontSize: '12px' }}>{result.error}</p> : null}
              <button type="submit" disabled={pending} style={{ border: '1px solid var(--color-burnt-orange)', backgroundColor: 'var(--color-burnt-orange)', color: 'var(--color-cream)', padding: '0.9rem 1rem', fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer' }}>
                {pending ? 'Submitting...' : 'Submit Custom Order'}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}
