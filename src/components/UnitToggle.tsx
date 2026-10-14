import type { TempUnit } from '../types/weather'

interface UnitToggleProps {
  unit: TempUnit
  onChange: (unit: TempUnit) => void
}

const UNITS: TempUnit[] = ['C', 'F']

export function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <div className="unit-toggle" role="group" aria-label="Đơn vị nhiệt độ">
      {UNITS.map((u) => (
        <button
          key={u}
          type="button"
          className={`unit-toggle__btn${u === unit ? ' unit-toggle__btn--active' : ''}`}
          aria-pressed={u === unit}
          onClick={() => onChange(u)}
        >
          °{u}
        </button>
      ))}
    </div>
  )
}
