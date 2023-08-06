import { useTheme } from '../contexts/ThemeContext'
import { Box, IconButton } from '@mui/material'

function ToggleThemeBtn() {
  const [theme, toggleTheme] = useTheme()
  return (
    <IconButton onClick={toggleTheme}>
      <Box
        component='img'
        src={theme === 'light' ? '/icon-moon.svg' : '/icon-sun.svg'}
        alt={theme === 'light' ? 'Moon icon' : 'Sun icon'}
      />
    </IconButton>
  )
}

export default ToggleThemeBtn
