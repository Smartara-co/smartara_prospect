'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'default' | 'light' | 'dark'

interface ThemeContextValue {
  theme: Theme
  setTheme: (t: Theme) => void
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'default',
  setTheme: () => {},
  toggle: () => {},
})

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('default')

  useEffect(() => {
    const stored = localStorage.getItem('sp-theme') as Theme | null
    if (stored) applyTheme(stored)
  }, [])

  function applyTheme(t: Theme) {
    setThemeState(t)
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    if (t === 'light') root.classList.add('light')
    if (t === 'dark') root.classList.add('dark')
    localStorage.setItem('sp-theme', t)
  }

  function toggle() {
    const order: Theme[] = ['default', 'light', 'dark']
    const next = order[(order.indexOf(theme) + 1) % order.length]
    applyTheme(next)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: applyTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}

export const ANTI_FLASH_SCRIPT = `
(function(){
  var t = localStorage.getItem('sp-theme');
  if (t === 'light') document.documentElement.classList.add('light');
  if (t === 'dark') document.documentElement.classList.add('dark');
})();
`

export default ThemeProvider
