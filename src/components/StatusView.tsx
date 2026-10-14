import type { City } from '../types/weather'

export function IdleView() {
  return (
    <div className="status">
      <div className="status__emoji" aria-hidden="true">
        🗺️
      </div>
      <p className="status__title">Chưa chọn thành phố</p>
      <p className="status__text">Hãy chọn một thành phố trong danh sách để xem thời tiết.</p>
    </div>
  )
}

export function LoadingView({ city }: { city: City }) {
  return (
    <div className="status" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p className="status__title">Đang tải thời tiết {city.name}…</p>
      <div className="skeleton" aria-hidden="true">
        <div className="skeleton__block skeleton__block--lg" />
        <div className="skeleton__row">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="skeleton__block" />
          ))}
        </div>
      </div>
    </div>
  )
}

interface ErrorViewProps {
  city: City
  message: string
  onRetry: () => void
}

export function ErrorView({ city, message, onRetry }: ErrorViewProps) {
  return (
    <div className="status status--error" role="alert">
      <div className="status__emoji" aria-hidden="true">
        ⚠️
      </div>
      <p className="status__title">Không tải được thời tiết {city.name}</p>
      <p className="status__text">{message}</p>
      <button type="button" className="btn" onClick={onRetry}>
        Thử lại
      </button>
    </div>
  )
}
