export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-AU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function formatDateLong(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatDateEyebrow(date: Date | string, category: string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day} / ${month} / ${year} — ${category.toUpperCase()}`
}

export function formatNumber(value: number): string {
  return value.toLocaleString('en-AU')
}

export function formatCurrency(value: number, currency: 'AUD' | 'USD' = 'AUD'): string {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency }).format(value)
}

export function formatDosage(d: { value: string; unit: string }): string {
  return `${d.value} ${d.unit}`
}
