/** Nhóm thời tiết, dùng để chọn màu nền */
export type WeatherGroup = 'clear' | 'cloudy' | 'fog' | 'drizzle' | 'rain' | 'snow' | 'storm' | 'unknown'

export interface WeatherInfo {
  description: string
  emoji: string
  group: WeatherGroup
}

/** Bảng mã thời tiết WMO mà Open-Meteo sử dụng */
const WEATHER_CODES: Record<number, WeatherInfo> = {
  0: { description: 'Trời quang', emoji: '☀️', group: 'clear' },
  1: { description: 'Gần như quang đãng', emoji: '🌤️', group: 'clear' },
  2: { description: 'Có mây rải rác', emoji: '⛅', group: 'cloudy' },
  3: { description: 'Nhiều mây', emoji: '☁️', group: 'cloudy' },
  45: { description: 'Sương mù', emoji: '🌫️', group: 'fog' },
  48: { description: 'Sương mù đóng băng', emoji: '🌫️', group: 'fog' },
  51: { description: 'Mưa phùn nhẹ', emoji: '🌦️', group: 'drizzle' },
  53: { description: 'Mưa phùn vừa', emoji: '🌦️', group: 'drizzle' },
  55: { description: 'Mưa phùn dày', emoji: '🌧️', group: 'drizzle' },
  56: { description: 'Mưa phùn băng nhẹ', emoji: '🌧️', group: 'drizzle' },
  57: { description: 'Mưa phùn băng dày', emoji: '🌧️', group: 'drizzle' },
  61: { description: 'Mưa nhẹ', emoji: '🌦️', group: 'rain' },
  63: { description: 'Mưa vừa', emoji: '🌧️', group: 'rain' },
  65: { description: 'Mưa to', emoji: '🌧️', group: 'rain' },
  66: { description: 'Mưa băng nhẹ', emoji: '🌨️', group: 'rain' },
  67: { description: 'Mưa băng nặng', emoji: '🌨️', group: 'rain' },
  71: { description: 'Tuyết rơi nhẹ', emoji: '🌨️', group: 'snow' },
  73: { description: 'Tuyết rơi vừa', emoji: '🌨️', group: 'snow' },
  75: { description: 'Tuyết rơi dày', emoji: '❄️', group: 'snow' },
  77: { description: 'Hạt tuyết', emoji: '❄️', group: 'snow' },
  80: { description: 'Mưa rào nhẹ', emoji: '🌦️', group: 'rain' },
  81: { description: 'Mưa rào vừa', emoji: '🌧️', group: 'rain' },
  82: { description: 'Mưa rào rất to', emoji: '⛈️', group: 'rain' },
  85: { description: 'Mưa tuyết rào nhẹ', emoji: '🌨️', group: 'snow' },
  86: { description: 'Mưa tuyết rào nặng', emoji: '🌨️', group: 'snow' },
  95: { description: 'Dông', emoji: '⛈️', group: 'storm' },
  96: { description: 'Dông kèm mưa đá nhẹ', emoji: '⛈️', group: 'storm' },
  99: { description: 'Dông kèm mưa đá lớn', emoji: '⛈️', group: 'storm' },
}

const UNKNOWN: WeatherInfo = { description: 'Không xác định', emoji: '🌡️', group: 'unknown' }

export function getWeatherInfo(code: number): WeatherInfo {
  return WEATHER_CODES[code] ?? UNKNOWN
}
