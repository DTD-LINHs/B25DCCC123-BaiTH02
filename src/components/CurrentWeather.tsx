import type { City, CurrentWeather as CurrentWeatherData, DailyForecast, TempUnit } from '../types/weather'
import { formatTemp, formatUpdatedAt } from '../utils/format'
import { getWeatherInfo } from '../utils/weatherCode'

interface CurrentWeatherProps {
  city: City
  current: CurrentWeatherData
  /** Dự báo của hôm nay, dùng để hiện cao/thấp trong ngày */
  today?: DailyForecast
  unit: TempUnit
}

export function CurrentWeather({ city, current, today, unit }: CurrentWeatherProps) {
  const info = getWeatherInfo(current.code)
  return (
    <section className="current" aria-labelledby="current-title">
      <div className="current__hero">
        <div className="current__info">
          <p className="current__eyebrow">📍 Thời tiết hiện tại</p>
          <h2 id="current-title" className="current__city">
            {city.name}
          </h2>
          <p className="current__temp">{formatTemp(current.temperature, unit)}</p>
          <p className="current__desc">{info.description}</p>
          <p className="current__updated">Cập nhật lúc {formatUpdatedAt(current.time)}</p>
        </div>
        <span className="current__emoji" role="img" aria-label={info.description}>
          {info.emoji}
        </span>
      </div>

      <dl className="current__stats">
        <div className="stat">
          <dt>💧 Độ ẩm</dt>
          <dd>{current.humidity}%</dd>
          <span className="stat__meter" aria-hidden="true">
            <span style={{ width: `${current.humidity}%` }} />
          </span>
        </div>
        <div className="stat">
          <dt>💨 Tốc độ gió</dt>
          <dd>
            {current.windSpeed} <small>km/h</small>
          </dd>
        </div>
        {today && (
          <div className="stat">
            <dt>🌡️ Hôm nay</dt>
            <dd>
              {formatTemp(today.max, unit)} <small>/ {formatTemp(today.min, unit)}</small>
            </dd>
          </div>
        )}
      </dl>
    </section>
  )
}
