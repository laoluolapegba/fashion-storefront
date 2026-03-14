'use client'

import { useState } from 'react'
import { submitBooking } from '@/app/actions/forms'

const timeSlots = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM']

export default function BookConsultationPage() {
  const [pending, setPending] = useState(false)
  const [result, setResult] = useState<{ success: boolean; error?: string } | null>(null)
  const [consultationType, setConsultationType] = useState('Virtual')

  const handleSubmit = async (formData: FormData) => {
    setPending(true)
    const response = await submitBooking(formData)
    setResult(response)
    setPending(false)
  }

  return (
    <main style={{ padding: '7rem 1.5rem 5rem' }}>
      <div style={{ maxWidth: '840px', margin: '0 auto' }}>
        <h1 style={{ margin: 0, marginBottom: '0.8rem', fontFamily: 'var(--font-display)', fontSize: '48px', fontWeight: 300, color: 'var(--color-espresso)' }}>Book a Styling Consultation</h1>
        <p style={{ margin: 0, marginBottom: '1.5rem', fontFamily: 'var(--font-ui)', color: 'var(--color-smoke)', lineHeight: 1.8 }}>
          Secure a one-on-one session for wardrobe direction, event styling, and custom recommendations.
        </p>

        <section style={{ border: '1px solid var(--color-linen)', padding: '1.2rem' }}>
          {result?.success ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <h2 style={{ margin: 0, marginBottom: '0.75rem', fontFamily: 'var(--font-display)', fontWeight: 300, fontSize: '36px' }}>Consultation Confirmed</h2>
              <p style={{ margin: 0, fontFamily: 'var(--font-ui)', color: 'var(--color-smoke)' }}>We&apos;ve received your booking and will contact you shortly.</p>
            </div>
          ) : (
            <form action={handleSubmit} style={{ display: 'grid', gap: '0.8rem' }}>
              <input name="full_name" required placeholder="Full name" />
              <input name="email" type="email" required placeholder="Email" />
              <input name="phone" required placeholder="Phone" />

              <input type="hidden" name="consultation_type" value={consultationType} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem' }}>
                {['Virtual', 'In-Person'].map((type) => {
                  const active = consultationType === type
                  return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setConsultationType(type)}
                      style={{
                        border: '1px solid var(--color-espresso)',
                        backgroundColor: active ? 'var(--color-espresso)' : 'transparent',
                        color: active ? 'var(--color-cream)' : 'var(--color-espresso)',
                        padding: '1rem',
                        fontFamily: 'var(--font-ui)',
                        fontSize: '10px',
                        letterSpacing: '0.25em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      {type}
                    </button>
                  )
                })}
              </div>

              <input name="preferred_date" type="date" required />
              <select name="preferred_time" required defaultValue="">
                <option value="" disabled>
                  Preferred time
                </option>
                {timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
              <textarea name="notes" rows={4} placeholder="Anything we should know before your consultation?" />
              {result?.error ? <p style={{ margin: 0, color: 'var(--color-error)', fontSize: '12px' }}>{result.error}</p> : null}
              <button type="submit" disabled={pending} style={{ border: '1px solid var(--color-burnt-orange)', backgroundColor: 'var(--color-burnt-orange)', color: 'var(--color-cream)', padding: '0.9rem 1rem', fontFamily: 'var(--font-ui)', fontSize: '10px', letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer' }}>
                {pending ? 'Submitting...' : 'Book Consultation'}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  )
}
