interface SearchBoxProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <div className="search">
      <span className="search__icon" aria-hidden="true">
        🔍
      </span>
      <input
        type="search"
        className="search__input"
        placeholder="Tìm thành phố…"
        title="Gõ không dấu cũng được, vd: da nang, hcm"
        aria-label="Tìm thành phố"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
