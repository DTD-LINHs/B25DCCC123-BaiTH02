import { useMemo, useState } from 'react'
import { CityList } from './components/CityList'
import { CurrentWeather } from './components/CurrentWeather'
import { Forecast } from './components/Forecast'
import { SearchBox } from './components/SearchBox'
import { ErrorView, IdleView, LoadingView } from './components/StatusView'
import { UnitToggle } from './components/UnitToggle'
import { CITIES, CITY_ALIASES } from './data/cities'
import { useFavorites } from './hooks/useFavorites'
import { useWeather } from './hooks/useWeather'
import type { City, TempUnit } from './types/weather'
import { normalizeText } from './utils/normalize'
import { getWeatherInfo } from './utils/weatherCode'

/** So khớp không dấu, không phân biệt hoa/thường; hỗ trợ viết liền ("hanoi") và tên tắt ("hcm") */
function matchesCity(city: City, query: string): boolean {
  const q = normalizeText(query)
  if (!q) return true
  const compactQ = q.replace(/ /g, '')
  const keys = [normalizeText(city.name), ...(CITY_ALIASES[city.id] ?? [])]
  return keys.some((key) => key.includes(q) || key.replace(/ /g, '').includes(compactQ))
}

export default function App() {
  const { state, load } = useWeather()
  const { favorites, toggleFavorite } = useFavorites()
  const [unit, setUnit] = useState<TempUnit>('C')
  const [query, setQuery] = useState('')

  // Lọc theo ô tìm kiếm, đưa thành phố yêu thích lên đầu (giữ thứ tự gốc trong từng nhóm)
  const visibleCities = useMemo(() => {
    const filtered = CITIES.filter((city) => matchesCity(city, query))
    const fav = filtered.filter((c) => favorites.includes(c.id))
    const rest = filtered.filter((c) => !favorites.includes(c.id))
    return [...fav, ...rest]
  }, [query, favorites])

  const selectedId = state.status === 'idle' ? null : state.city.id
  const theme = state.status === 'success' ? getWeatherInfo(state.data.current.code).group : 'default'

  return (
    <div className={`app theme-${theme}`}>
      <header className="app__header">
        <h1 className="app__title">🌦️ Thời tiết Việt Nam</h1>
        <UnitToggle unit={unit} onChange={setUnit} />
      </header>

      <main className="app__layout">
        <aside className="panel sidebar" aria-label="Danh sách thành phố">
          <SearchBox value={query} onChange={setQuery} />
          <CityList
            cities={visibleCities}
            selectedId={selectedId}
            favorites={favorites}
            onSelect={load}
            onToggleFavorite={toggleFavorite}
          />
        </aside>

        <section className="panel content" aria-live="polite">
          {state.status === 'idle' && <IdleView />}
          {state.status === 'loading' && <LoadingView city={state.city} />}
          {state.status === 'error' && (
            <ErrorView city={state.city} message={state.message} onRetry={() => load(state.city)} />
          )}
          {state.status === 'success' && (
            <>
              <CurrentWeather city={state.city} current={state.data.current} unit={unit} />
              <Forecast daily={state.data.daily} unit={unit} />
            </>
          )}
        </section>
      </main>

      <footer className="app__footer">
        Dữ liệu: <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">Open-Meteo</a>
      </footer>
    </div>
  )
}
