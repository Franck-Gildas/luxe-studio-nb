export function parseTotal(total: string): number {
  const cleaned = total.replace(/[^0-9.]/g, '')
  const value = parseFloat(cleaned)
  return Number.isFinite(value) ? value : 0
}

export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('en-US', { maximumFractionDigits: 0 })}`
}
