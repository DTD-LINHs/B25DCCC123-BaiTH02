/** Thành phố hiển thị trong danh sách */
export interface City {
  id: string
  name: string
  lat: number
  lon: number
}

/** Response gốc từ Open-Meteo (chỉ các trường được yêu cầu trong URL) */
export interface OpenMeteoResponse {
  latitude: number
  longitude: number
  timezone: string
  current_units: {
    time: string
    interval: string
    temperature_2m: string
    relative_humidity_2m: string
    weather_code: string
    wind_speed_10m: string
  }
  current: {
    time: string // "2026-10-14T08:45" (giờ theo timezone yêu cầu)
    interval: number
    temperature_2m: number
    relative_humidity_2m: number
    weather_code: number
    wind_speed_10m: number
  }
  daily_units: {
    time: string
    weather_code: string
    temperature_2m_max: string
    temperature_2m_min: string
  }
  daily: {
    time: string[] // "2026-10-14"
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
  }
}

/** Dữ liệu đã chuẩn hóa để UI dùng (nhiệt độ luôn lưu ở °C) */
export interface CurrentWeather {
  time: string
  temperature: number
  humidity: number
  windSpeed: number
  code: number
}

export interface DailyForecast {
  date: string
  code: number
  max: number
  min: number
}

export interface WeatherData {
  current: CurrentWeather
  daily: DailyForecast[]
}

export type TempUnit = 'C' | 'F'

export type WeatherState =
  | { status: 'idle' }
  | { status: 'loading'; city: City }
  | { status: 'error'; city: City; message: string }
  | { status: 'success'; city: City; data: WeatherData }
