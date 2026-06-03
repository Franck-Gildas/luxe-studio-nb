import { fetchAllBookingsFromSheet } from '@/lib/google-sheets'

export const runtime = 'nodejs'

export async function GET() {
  try {
    const result = await fetchAllBookingsFromSheet()
    if (!result.ok) {
      console.error('Admin bookings fetch failed:', result.error)
      return Response.json({ error: result.error }, { status: result.status })
    }

    return Response.json({ bookings: result.bookings })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error'
    console.error('Admin bookings API route error:', err)
    return Response.json({ error: message }, { status: 500 })
  }
}
