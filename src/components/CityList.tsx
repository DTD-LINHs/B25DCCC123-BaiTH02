import type { City } from '../types/weather'

interface CityListProps {
  cities: City[]
  selectedId: string | null
  favorites: string[]
  onSelect: (city: City) => void
  onToggleFavorite: (id: string) => void
}

export function CityList({ cities, selectedId, favorites, onSelect, onToggleFavorite }: CityListProps) {
  if (cities.length === 0) {
    return <p className="city-list__empty">Không tìm thấy thành phố phù hợp.</p>
  }

  return (
    <ul className="city-list">
      {cities.map((city) => {
        const isSelected = city.id === selectedId
        const isFavorite = favorites.includes(city.id)
        return (
          <li key={city.id} className={`city-item${isSelected ? ' city-item--active' : ''}`}>
            <button
              type="button"
              className="city-item__name"
              aria-pressed={isSelected}
              onClick={() => onSelect(city)}
            >
              {city.name}
            </button>
            <button
              type="button"
              className={`city-item__fav${isFavorite ? ' city-item__fav--on' : ''}`}
              aria-pressed={isFavorite}
              aria-label={isFavorite ? `Bỏ yêu thích ${city.name}` : `Yêu thích ${city.name}`}
              title={isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'}
              onClick={() => onToggleFavorite(city.id)}
            >
              {isFavorite ? '⭐' : '☆'}
            </button>
          </li>
        )
      })}
    </ul>
  )
}
