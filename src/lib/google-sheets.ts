import { createSign } from 'crypto'

const SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets'
const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const DEFAULT_TAB_NAME = 'Sheet1'
const VALUE_RANGE_COLUMNS = 'A:N'

export type SheetsBookingPayload = {
  date: string
  name: string
  email: string
  phone: string
  service: string
  addons: string
  total: string
  artist: string
  appointment_date: string
  appointment_time: string
  first_visit: string
  how_heard: string
  notes: string
  status: string
}

export function isValidSheetsBookingPayload(data: unknown): data is SheetsBookingPayload {
  if (!data || typeof data !== 'object') return false
  const d = data as Record<string, unknown>
  return (
    typeof d.date === 'string' &&
    typeof d.name === 'string' &&
    typeof d.email === 'string' &&
    typeof d.phone === 'string' &&
    typeof d.service === 'string' &&
    typeof d.addons === 'string' &&
    typeof d.total === 'string' &&
    typeof d.artist === 'string' &&
    typeof d.appointment_date === 'string' &&
    typeof d.appointment_time === 'string' &&
    typeof d.first_visit === 'string' &&
    typeof d.how_heard === 'string' &&
    typeof d.notes === 'string' &&
    typeof d.status === 'string'
  )
}

export function payloadToSheetRow(data: SheetsBookingPayload): string[] {
  return [
    data.date || new Date().toISOString(),
    data.name,
    data.email,
    data.phone,
    data.service,
    data.addons,
    data.total,
    data.artist,
    data.appointment_date,
    data.appointment_time,
    data.first_visit,
    data.how_heard,
    data.notes,
    data.status || 'New',
  ]
}

export function normalizeGoogleSheetId(raw: string): string {
  const trimmed = raw.trim()
  const fromUrl = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)
  if (fromUrl) return fromUrl[1]
  return trimmed
}

function normalizePrivateKey(key: string): string {
  let trimmed = key.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    trimmed = trimmed.slice(1, -1)
  }
  return trimmed.replace(/\\n/g, '\n')
}

function base64UrlEncode(input: string | Buffer): string {
  return Buffer.from(input).toString('base64url')
}

async function getServiceAccountAccessToken(
  email: string,
  privateKey: string,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const header = base64UrlEncode(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claim = base64UrlEncode(
    JSON.stringify({
      iss: email,
      scope: SHEETS_SCOPE,
      aud: TOKEN_URL,
      exp: now + 3600,
      iat: now,
    }),
  )
  const signInput = `${header}.${claim}`
  const signer = createSign('RSA-SHA256')
  signer.update(signInput)
  signer.end()
  const signature = signer.sign(normalizePrivateKey(privateKey), 'base64url')
  const jwt = `${signInput}.${signature}`

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Google token exchange failed (${res.status}): ${detail}`)
  }

  const json = (await res.json()) as { access_token?: string }
  if (!json.access_token) {
    throw new Error('Google token exchange returned no access_token')
  }
  return json.access_token
}

function escapeSheetTabName(name: string): string {
  return name.includes("'") ? `'${name.replace(/'/g, "''")}'` : name
}

function sheetsAccessError(serviceEmail: string | undefined): string {
  const shareTarget = serviceEmail ?? 'your service account email'
  return (
    `Cannot access spreadsheet. Verify GOOGLE_SHEET_ID (ID only, from the sheet URL between /d/ and /edit). ` +
    `Share the sheet with ${shareTarget} as Editor — Google often returns 404 when the service account lacks access. ` +
    `On Vercel/production, set GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY in project Environment Variables (.env.local is not deployed).`
  )
}

function formatReadRange(tabName: string): string {
  return `${escapeSheetTabName(tabName)}!${VALUE_RANGE_COLUMNS}`
}

async function resolveSheetTabRange(
  sheetId: string,
  accessToken: string,
  serviceEmail: string | undefined,
): Promise<string | SheetsApiError> {
  const configuredTab = process.env.GOOGLE_SHEET_TAB_NAME?.trim()
  if (configuredTab) {
    return formatReadRange(configuredTab)
  }

  const metaRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}?fields=sheets.properties.title`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  )

  if (!metaRes.ok) {
    const detail = await metaRes.text().catch(() => '')
    if (metaRes.status === 404) {
      return { ok: false, error: sheetsAccessError(serviceEmail), status: 404 }
    }
    return {
      ok: false,
      error: detail || `Failed to read spreadsheet (${metaRes.status})`,
      status: metaRes.status,
    }
  }

  const meta = (await metaRes.json()) as {
    sheets?: Array<{ properties?: { title?: string } }>
  }
  const tabName = meta.sheets?.[0]?.properties?.title ?? DEFAULT_TAB_NAME
  return formatReadRange(tabName)
}

async function resolveAppendRange(
  sheetId: string,
  accessToken: string,
  serviceEmail: string | undefined,
): Promise<string | AppendBookingRowResult> {
  const result = await resolveSheetTabRange(sheetId, accessToken, serviceEmail)
  if (typeof result !== 'string') {
    return result
  }
  return result
}

type SheetsApiError = { ok: false; error: string; status: number }

async function getSheetsAccessToken(): Promise<
  { ok: true; accessToken: string; serviceEmail: string | undefined } | SheetsApiError
> {
  const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim()
  const serviceKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim()
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY?.trim()

  if (serviceEmail && serviceKey) {
    try {
      const accessToken = await getServiceAccountAccessToken(serviceEmail, serviceKey)
      return { ok: true, accessToken, serviceEmail }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Service account auth failed'
      console.error('Google Sheets service account auth failed:', message)
      return { ok: false, error: message, status: 500 }
    }
  }

  if (apiKey) {
    return {
      ok: false,
      error:
        'Service account required: set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY',
      status: 503,
    }
  }

  return {
    ok: false,
    error:
      'Google Sheets is not configured (set service account credentials or GOOGLE_SHEETS_API_KEY)',
    status: 500,
  }
}

export type AdminBooking = SheetsBookingPayload & { sheetRow: number }

export function rowToBooking(row: string[], sheetRow: number): AdminBooking {
  const pad = (i: number) => row[i]?.trim() ?? ''
  return {
    sheetRow,
    date: pad(0),
    name: pad(1),
    email: pad(2),
    phone: pad(3),
    service: pad(4),
    addons: pad(5),
    total: pad(6),
    artist: pad(7),
    appointment_date: pad(8),
    appointment_time: pad(9),
    first_visit: pad(10),
    how_heard: pad(11),
    notes: pad(12),
    status: pad(13) || 'New',
  }
}

function isHeaderRow(row: string[]): boolean {
  return row[0]?.trim().toLowerCase() === 'date'
}

export type FetchAllBookingsResult =
  | { ok: true; bookings: AdminBooking[] }
  | { ok: false; error: string; status: number }

export async function fetchAllBookingsFromSheet(): Promise<FetchAllBookingsResult> {
  const rawSheetId = process.env.GOOGLE_SHEET_ID?.trim()
  if (!rawSheetId) {
    return { ok: false, error: 'GOOGLE_SHEET_ID is not configured', status: 500 }
  }
  const sheetId = normalizeGoogleSheetId(rawSheetId)

  const auth = await getSheetsAccessToken()
  if (!auth.ok) {
    return auth
  }

  const { accessToken, serviceEmail } = auth
  const readRange = await resolveSheetTabRange(sheetId, accessToken, serviceEmail)
  if (typeof readRange !== 'string') {
    return readRange
  }

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/${encodeURIComponent(readRange)}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    return {
      ok: false,
      error: formatSheetsApiError(res.status, detail, serviceEmail),
      status: res.status,
    }
  }

  const json = (await res.json()) as { values?: string[][] }
  const rows = json.values ?? []
  const bookings: AdminBooking[] = []

  rows.forEach((row, index) => {
    const sheetRow = index + 1
    if (index === 0 && isHeaderRow(row)) return
    if (!row.some((cell) => cell?.trim())) return
    bookings.push(rowToBooking(row, sheetRow))
  })

  return { ok: true, bookings }
}


function formatSheetsApiError(
  status: number,
  detail: string,
  serviceEmail: string | undefined,
): string {
  if (status === 404) {
    return sheetsAccessError(serviceEmail)
  }
  return detail || `Sheets API request failed (${status})`
}

export type AppendBookingRowResult =
  | { ok: true }
  | { ok: false; error: string; status: number }

export async function appendBookingRowToSheet(
  data: SheetsBookingPayload,
): Promise<AppendBookingRowResult> {
  const rawSheetId = process.env.GOOGLE_SHEET_ID?.trim()
  if (!rawSheetId) {
    return { ok: false, error: 'GOOGLE_SHEET_ID is not configured', status: 500 }
  }
  const sheetId = normalizeGoogleSheetId(rawSheetId)

  const auth = await getSheetsAccessToken()
  if (!auth.ok) {
    return auth
  }

  const { accessToken, serviceEmail } = auth

  const appendRange = await resolveAppendRange(sheetId, accessToken, serviceEmail)
  if (typeof appendRange !== 'string') {
    return appendRange
  }

  const params = new URLSearchParams({ valueInputOption: 'RAW' })
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/${encodeURIComponent(appendRange)}:append?${params.toString()}`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ values: [payloadToSheetRow(data)] }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    return {
      ok: false,
      error: formatSheetsApiError(res.status, detail, serviceEmail),
      status: res.status,
    }
  }

  return { ok: true }
}
