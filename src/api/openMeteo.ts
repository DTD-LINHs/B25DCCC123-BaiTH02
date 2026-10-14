import type { City, OpenMeteoResponse, WeatherData } from '../types/weather'

const BASE_URL = 'https://api.open-meteo.com/v1/forecast'

export function buildWeatherUrl(city: City): string {
  const params = new URLSearchParams({
    latitude: String(city.lat),
    longitude: String(city.lon),
    current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'Asia/Ho_Chi_Minh',
    forecast_days: '7',
  })
  return `${BASE_URL}?${params.toString()}`
}

/** Gộp 4 mảng song song của daily (phần tử thứ i cùng một ngày) thành mảng object */
function toWeatherData(res: OpenMeteoResponse): WeatherData {
  const { current, daily } = res
  return {
    current: {
      time: current.time,
      temperature: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      code: current.weather_code,
    },
    daily: daily.time.map((date, i) => ({
      date,
      code: daily.weather_code[i],
      max: daily.temperature_2m_max[i],
      min: daily.temperature_2m_min[i],
    })),
  }
}

export function isAbortError(err: unknown): boolean {
  return err instanceof DOMException && err.name === 'AbortError'
}

export async function fetchWeather(city: City, signal?: AbortSignal): Promise<WeatherData> {
  let res: Response
  try {
    res = await fetch(buildWeatherUrl(city), { signal })
  } catch (err) {
    // Request bị hủy chủ động: ném lại nguyên vẹn để hook bỏ qua
    if (isAbortError(err)) throw err
    throw new Error('Không thể kết nối tới máy chủ thời tiết. Vui lòng kiểm tra mạng.', { cause: err })
  }
  if (!res.ok) {
    throw new Error(`Máy chủ trả về lỗi ${res.status}. Vui lòng thử lại sau.`)
  }
  const json = (await res.json()) as OpenMeteoResponse
  return toWeatherData(json)
}
