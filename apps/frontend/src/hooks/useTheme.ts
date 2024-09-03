import { useCallback, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

const THEMES = ['light', 'dark'] as const
type Theme = (typeof THEMES)[number]

export const useTheme = () => {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light')

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
  }, [setTheme, theme])

  useEffect(() => {
    document.body.classList.remove(...THEMES)
    document.body.classList.add(theme)
  }, [theme])

  return { theme, setTheme, toggleTheme } as const
}
