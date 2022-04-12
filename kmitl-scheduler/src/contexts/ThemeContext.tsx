import { ReactNode, useMemo, createContext, useState, FC } from 'react'
import { ThemeProvider as MuiThemeProvider, Theme } from '@mui/material'

import { theme as mainTheme } from 'themes/main'

interface IThemeContext {
  setTheme: (theme: ThemeMode) => void
}

interface ThemeProviderProps {
  children: ReactNode
}

export type ThemeMode = 'main' | 'someTheme'

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext)

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [themeName, _setThemeName] = useState<ThemeMode>('main')

  const setTheme = (theme: ThemeMode) => _setThemeName(theme)

  const themeToProvider: Theme = useMemo(() => {
    switch (themeName) {
      case 'main':
        return mainTheme
      case 'someTheme':
        return mainTheme // * For new theme in the future
      default:
        return mainTheme
    }
  }, [themeName])

  return (
    <ThemeContext.Provider value={{ setTheme }}>
      <MuiThemeProvider theme={themeToProvider}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  )
}
