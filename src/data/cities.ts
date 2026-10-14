import type { City } from '../types/weather'

export const CITIES: City[] = [
  { id: 'ha-noi', name: 'Hà Nội', lat: 21.0285, lon: 105.8542 },
  { id: 'hai-phong', name: 'Hải Phòng', lat: 20.8449, lon: 106.6881 },
  { id: 'hue', name: 'Huế', lat: 16.4637, lon: 107.5909 },
  { id: 'da-nang', name: 'Đà Nẵng', lat: 16.0544, lon: 108.2022 },
  { id: 'nha-trang', name: 'Nha Trang', lat: 12.2388, lon: 109.1967 },
  { id: 'da-lat', name: 'Đà Lạt', lat: 11.9404, lon: 108.4583 },
  { id: 'ho-chi-minh', name: 'TP. Hồ Chí Minh', lat: 10.8231, lon: 106.6297 },
  { id: 'can-tho', name: 'Cần Thơ', lat: 10.0452, lon: 105.7469 },
]

/** Tên gọi tắt để tìm kiếm (viết ở dạng không dấu) */
export const CITY_ALIASES: Record<string, string[]> = {
  'ha-noi': ['hn'],
  'hai-phong': ['hp'],
  'da-nang': ['dn'],
  'ho-chi-minh': ['hcm', 'tphcm', 'sai gon', 'saigon'],
}
