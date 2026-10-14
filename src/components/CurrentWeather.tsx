import type { City, CurrentWeather as CurrentWeatherData, TempUnit } from '../types/weather'
import { formatTemp, formatUpdatedAt } from '../utils/format'
import { getWeatherInfo } from '../utils/weatherCode'

interface CurrentWeatherProps {
  city: City
  current: CurrentWeatherData
  unit: TempUnit
}

export function CurrentWeather({ city, current, unit }: CurrentWeatherProps) {
  const info = getWeatherInfo(current.code)
  return (
    <section className="current" aria-labelledby="current-title">
      <p className="current__eyebrow">📍 Thời tiết hiện tại</p>
      <h2 id="current-title" className="current__city">
        {city.name}
      </h2>

      {/* Emoji và nhiệt độ cùng hàng, mô tả nằm kế bên (xuống dòng trên màn hẹp) */}
      <div className="current__main">
        <span className="current__emoji" role="img" aria-label={info.description}>
          {info.emoji}
        </span>
        <p className="current__temp">{formatTemp(current.temperature, unit)}</p>
        <div className="current__meta">
          <p className="current__desc">{info.description}</p>
          <p className="current__updated">Cập nhật lúc {formatUpdatedAt(current.time)}</p>
        </div>
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
      </dl>
    </section>
  )
}
