import type { TempUnit } from '../types/weather'

const WEEKDAYS = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy']

const pad = (n: number) => String(n).padStart(2, '0')

/** Đổi nhiệt độ gốc (°C) sang đơn vị hiển thị, làm tròn */
export function convertTemp(celsius: number, unit: TempUnit): number {
  return Math.round(unit === 'F' ? (celsius * 9) / 5 + 32 : celsius)
}

export function formatTemp(celsius: number, unit: TempUnit): string {
  return `${convertTemp(celsius, unit)}°${unit}`
}

/**
 * Parse "YYYY-MM-DD" theo giờ địa phương.
 * Không dùng new Date("YYYY-MM-DD") vì chuỗi đó được hiểu là UTC → có thể lệch 1 ngày.
 */
export function parseLocalDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d)
}

/** "Thứ Hai"…"Chủ Nhật"; ngày đầu tiên (index 0) hiển thị "Hôm nay" */
export function formatWeekday(iso: string, index: number): string {
  return index === 0 ? 'Hôm nay' : WEEKDAYS[parseLocalDate(iso).getDay()]
}

/** "2026-10-14" → "14/10" */
export function formatDayMonth(iso: string): string {
  const date = parseLocalDate(iso)
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}`
}

/** "2026-10-14T08:45" (đã là giờ Việt Nam do API trả về) → "08:45, 14/10/2026" */
export function formatUpdatedAt(isoDateTime: string): string {
  const [datePart, timePart = '00:00'] = isoDateTime.split('T')
  const [y, m, d] = datePart.split('-')
  return `${timePart.slice(0, 5)}, ${d}/${m}/${y}`
}
