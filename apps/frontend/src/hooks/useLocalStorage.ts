import { useEffect, useState } from 'react'

const subscribe = (callback: () => void) => {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

const getItem = (key: string, initialValue: unknown) => {
  const item = window.localStorage.getItem(key)
  return item ? JSON.parse(item) : initialValue
}

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    setValue(getItem(key, initialValue))
  }, [key, initialValue])

  useEffect(() => {
    const handleStorage = () => {
      setValue(getItem(key, initialValue))
    }

    return subscribe(handleStorage)
  }, [key, initialValue])

  const setItem = (newValue: T) => {
    window.localStorage.setItem(key, JSON.stringify(newValue))
    setValue(newValue)
  }

  return [value, setItem] as const
}
