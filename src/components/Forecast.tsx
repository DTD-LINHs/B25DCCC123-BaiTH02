import type { DailyForecast, TempUnit } from '../types/weather'
import { formatDayMonth, formatTemp, formatWeekday } from '../utils/format'
import { getWeatherInfo } from '../utils/weatherCode'

interface ForecastProps {
  daily: DailyForecast[]
  unit: TempUnit
}

export function Forecast({ daily, unit }: ForecastProps) {
  return (
    <section className="forecast" aria-labelledby="forecast-title">
      <h3 id="forecast-title" className="forecast__title">
        Dự báo 7 ngày
      </h3>
      <ol className="forecast__list">
        {daily.map((day, i) => {
          const info = getWeatherInfo(day.code)
          return (
            <li key={day.date} className={`forecast-day${i === 0 ? ' forecast-day--today' : ''}`}>
              <span className="forecast-day__weekday">{formatWeekday(day.date, i)}</span>
              <span className="forecast-day__date">{formatDayMonth(day.date)}</span>
              <span className="forecast-day__emoji" role="img" aria-label={info.description} title={info.description}>
                {info.emoji}
              </span>
              <span className="forecast-day__temps">
                <span className="forecast-day__max" title="Cao nhất">
                  {formatTemp(day.max, unit)}
                </span>
                <span className="forecast-day__min" title="Thấp nhất">
                  {formatTemp(day.min, unit)}
                </span>
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
