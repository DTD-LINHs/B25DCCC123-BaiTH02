import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchWeather, isAbortError } from '../api/openMeteo'
import type { City, WeatherState } from '../types/weather'

/** Quản lý vòng đời tải thời tiết: idle → loading → success | error */
export function useWeather() {
  const [state, setState] = useState<WeatherState>({ status: 'idle' })
  const controllerRef = useRef<AbortController | null>(null)

  const load = useCallback(async (city: City) => {
    // Hủy request trước đó để dữ liệu thành phố cũ không đè lên thành phố mới
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller

    setState({ status: 'loading', city })
    try {
      const data = await fetchWeather(city, controller.signal)
      if (!controller.signal.aborted) setState({ status: 'success', city, data })
    } catch (err) {
      if (isAbortError(err) || controller.signal.aborted) return
      const message = err instanceof Error ? err.message : 'Đã xảy ra lỗi không xác định.'
      setState({ status: 'error', city, message })
    }
  }, [])

  // Hủy request đang chạy khi component unmount
  useEffect(() => () => controllerRef.current?.abort(), [])

  return { state, load }
}
