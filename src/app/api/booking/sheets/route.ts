import {
  appendBookingRowToSheet,
  isValidSheetsBookingPayload,
} from '@/lib/google-sheets'

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json()
    if (!isValidSheetsBookingPayload(body)) {
      return Response.json({ error: 'Invalid payload' }, { status: 400 })
    }

    const result = await appendBookingRowToSheet(body)
    if (!result.ok) {
      console.error('Google Sheets append failed:', result.error)
      return Response.json({ error: result.error }, { status: result.status })
    }

    return Response.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unexpected error'
    console.error('Google Sheets API route error:', err)
    return Response.json({ error: message }, { status: 500 })
  }
}
