import type { CSSProperties } from 'react'
import type { DailyForecast, TempUnit } from '../types/weather'
import { formatDayMonth, formatTemp, formatWeekday } from '../utils/format'
import { getWeatherInfo } from '../utils/weatherCode'

interface ForecastProps {
  daily: DailyForecast[]
  /** Nhiệt độ hiện tại (°C), đánh dấu trên thanh của hàng "Hôm nay" */
  currentTemp: number
  unit: TempUnit
}

export function Forecast({ daily, currentTemp, unit }: ForecastProps) {
  // Thang chung cho cả tuần: vị trí thanh của mỗi ngày thể hiện xu hướng nóng/lạnh
  const weekMin = Math.min(...daily.map((d) => d.min))
  const weekMax = Math.max(...daily.map((d) => d.max))
  const span = Math.max(weekMax - weekMin, 1)
  const toPercent = (t: number) => Math.min(Math.max(((t - weekMin) / span) * 100, 0), 100)

  return (
    <section className="forecast" aria-labelledby="forecast-title">
      <div className="forecast__head">
        <h3 id="forecast-title" className="forecast__title">
          Dự báo 7 ngày
        </h3>
        <span className="forecast__range">
          {formatTemp(weekMin, unit)} – {formatTemp(weekMax, unit)}
        </span>
      </div>
      <ol className="forecast__list">
        {daily.map((day, i) => {
          const info = getWeatherInfo(day.code)
          const isToday = i === 0
          const weekday = formatWeekday(day.date, i)
          const max = formatTemp(day.max, unit)
          const min = formatTemp(day.min, unit)
          const rangeStyle = {
            '--lo': `${toPercent(day.min)}%`,
            '--hi': `${toPercent(day.max)}%`,
            '--now': `${toPercent(currentTemp)}%`,
          } as CSSProperties
          return (
            <li
              key={day.date}
              className={`forecast-day${isToday ? ' forecast-day--today' : ''}`}
              title={`${weekday} ${formatDayMonth(day.date)}: ${info.description}, thấp ${min}, cao ${max}`}
            >
              <span className="forecast-day__label">
                <span className="forecast-day__weekday">{weekday}</span>
                <span className="forecast-day__date">{formatDayMonth(day.date)}</span>
              </span>
              <span className="forecast-day__emoji" role="img" aria-label={info.description}>
                {info.emoji}
              </span>
              <span className="temp-range" style={rangeStyle}>
                <span className="temp-range__min">
                  <span className="sr-only">Thấp nhất </span>
                  {min}
                </span>
                <span className="temp-range__track" aria-hidden="true">
                  <span className="temp-range__bar" />
                  {isToday && (
                    <span className="temp-range__now" title={`Hiện tại ${formatTemp(currentTemp, unit)}`} />
                  )}
                </span>
                <span className="temp-range__max">
                  <span className="sr-only">Cao nhất </span>
                  {max}
                </span>
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
