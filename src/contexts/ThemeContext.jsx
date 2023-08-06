import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createContext, useContext, useMemo, useState } from 'react'
import { GlobalStyles } from '@mui/material'
import PropTypes from 'prop-types'

const ThemeContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export function useTheme() {
  return useContext(ThemeContext)
}

function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const themeConstructor = useMemo(
    () =>
      createTheme({
        palette: {
          action: {
            active: 'hsl(192, 100%, 67%), hsl(280, 87%, 65%)',
          },
          mode: theme,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'capitalize',
              },
            },
          },
          MuiToggleButton: {
            styleOverrides: {
              root: {
                textTransform: 'capitalize',
              },
            },
          },
        },
      }),
    [theme]
  )
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }
  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      <ThemeProvider theme={themeConstructor}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <GlobalStyles
          styles={{
            '*': {
              margin: 0,
              padding: 0,
              boxSizing: 'border-box',
            },
          }}
        />
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

ThemeContextProvider.propTypes = {
  children: PropTypes.element,
}

export default ThemeContextProvider
