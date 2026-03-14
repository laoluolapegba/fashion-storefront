'use server'

import { createSupabaseServerClient } from '@/lib/supabase/server'

type ActionResult = {
  success: boolean
  error?: string
}

export async function submitInquiry(formData: FormData): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient()

  const payload = {
    full_name: String(formData.get('full_name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim() || null,
    subject: String(formData.get('subject') ?? '').trim() || null,
    message: String(formData.get('message') ?? '').trim(),
  }

  const { error } = await supabase.from('inquiries').insert(payload)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function submitBooking(formData: FormData): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient()

  const payload = {
    full_name: String(formData.get('full_name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    consultation_type: String(formData.get('consultation_type') ?? 'Virtual').trim(),
    preferred_date: String(formData.get('preferred_date') ?? '').trim() || null,
    preferred_time: String(formData.get('preferred_time') ?? '').trim() || null,
    notes: String(formData.get('notes') ?? '').trim() || null,
  }

  const { error } = await supabase.from('bookings').insert(payload)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}

export async function submitCustomOrder(formData: FormData): Promise<ActionResult> {
  const supabase = await createSupabaseServerClient()

  const payload = {
    full_name: String(formData.get('full_name') ?? '').trim(),
    email: String(formData.get('email') ?? '').trim(),
    phone: String(formData.get('phone') ?? '').trim(),
    design_reference: String(formData.get('design_reference') ?? '').trim() || null,
    fabric_preference:
      String(formData.get('fabric_preference') ?? '').trim() || null,
    occasion: String(formData.get('occasion') ?? '').trim() || null,
    event_date: String(formData.get('event_date') ?? '').trim() || null,
    delivery_timeline:
      String(formData.get('delivery_timeline') ?? '').trim() || null,
    measurements: {
      bust: String(formData.get('bust') ?? '').trim(),
      waist: String(formData.get('waist') ?? '').trim(),
      hips: String(formData.get('hips') ?? '').trim(),
      height: String(formData.get('height') ?? '').trim(),
      measurement_notes: String(formData.get('measurement_notes') ?? '').trim(),
    },
  }

  const { error } = await supabase.from('custom_orders').insert(payload)

  if (error) {
    return { success: false, error: error.message }
  }

  return { success: true }
}
