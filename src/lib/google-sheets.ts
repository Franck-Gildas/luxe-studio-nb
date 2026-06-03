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

function normalizePrivateKey(key: string): string {
  const trimmed = key.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).replace(/\\n/g, '\n')
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

function formatAppendRange(tabName: string): string {
  return `${escapeSheetTabName(tabName)}!${VALUE_RANGE_COLUMNS}`
}

async function resolveAppendRange(
  sheetId: string,
  accessToken: string,
): Promise<string | AppendBookingRowResult> {
  const configuredTab = process.env.GOOGLE_SHEET_TAB_NAME?.trim()
  if (configuredTab) {
    return formatAppendRange(configuredTab)
  }

  const metaRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}?fields=sheets.properties.title`,
    { headers: { Authorization: `Bearer ${accessToken}` } },
  )

  if (!metaRes.ok) {
    const detail = await metaRes.text().catch(() => '')
    if (metaRes.status === 404) {
      return {
        ok: false,
        error:
          'Spreadsheet not found. Check GOOGLE_SHEET_ID (copy from the sheet URL) and share the sheet with your service account email as Editor.',
        status: 404,
      }
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
  return formatAppendRange(tabName)
}

function formatSheetsApiError(status: number, detail: string): string {
  if (status === 404) {
    return 'Spreadsheet or tab not found. Verify GOOGLE_SHEET_ID and GOOGLE_SHEET_TAB_NAME, and share the sheet with the service account.'
  }
  return detail || `Sheets API request failed (${status})`
}

export type AppendBookingRowResult =
  | { ok: true }
  | { ok: false; error: string; status: number }

export async function appendBookingRowToSheet(
  data: SheetsBookingPayload,
): Promise<AppendBookingRowResult> {
  const sheetId = process.env.GOOGLE_SHEET_ID?.trim()
  if (!sheetId) {
    return { ok: false, error: 'GOOGLE_SHEET_ID is not configured', status: 500 }
  }

  const serviceEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim()
  const serviceKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.trim()
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY?.trim()

  let accessToken: string | null = null

  if (serviceEmail && serviceKey) {
    try {
      accessToken = await getServiceAccountAccessToken(serviceEmail, serviceKey)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Service account auth failed'
      console.error('Google Sheets service account auth failed:', message)
      return { ok: false, error: message, status: 500 }
    }
  } else if (apiKey) {
    console.warn(
      'Google Sheets: service account env vars not set. GOOGLE_SHEETS_API_KEY cannot append rows (Sheets API requires OAuth). Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, then share the sheet with the service account email as Editor.',
    )
    return {
      ok: false,
      error:
        'Service account required: set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY',
      status: 503,
    }
  } else {
    return {
      ok: false,
      error:
        'Google Sheets is not configured (set service account credentials or GOOGLE_SHEETS_API_KEY)',
      status: 500,
    }
  }

  const appendRange = await resolveAppendRange(sheetId, accessToken)
  if (typeof appendRange !== 'string') {
    return appendRange
  }

  const params = new URLSearchParams({ valueInputOption: 'RAW' })
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(sheetId)}/values/${encodeURIComponent(appendRange)}:append?${params.toString()}`

  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ values: [payloadToSheetRow(data)] }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    return {
      ok: false,
      error: formatSheetsApiError(res.status, detail),
      status: res.status,
    }
  }

  return { ok: true }
}
