import { ToggleButton, ToggleButtonGroup, useTheme } from '@mui/material'
import { useTodos } from '../contexts/TodosContext'
function TodoFilter() {
  const { filter, setFilter } = useTodos()
  const muiTheme = useTheme()
  return (
    <ToggleButtonGroup
      value={filter}
      onChange={(_e, v) => setFilter(v === null ? 'all' : v)}
      size='small'
      aria-label='Todos filter'
      exclusive
    >
      <ToggleButton
        value='all'
        sx={{
          border: 'none',
          '&:hover': {
            backgroundColor: 'unset',
          },
          '&.Mui-selected': {
            color: muiTheme.palette.primary.main,
            bgcolor: 'transparent',
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        All
      </ToggleButton>
      <ToggleButton
        value='active'
        sx={{
          border: 'none',
          '&:hover': {
            backgroundColor: 'unset',
          },
          '&.Mui-selected': {
            color: muiTheme.palette.primary.main,
            bgcolor: 'transparent',
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        Active
      </ToggleButton>
      <ToggleButton
        value='completed'
        sx={{
          border: 'none',
          '&:hover': {
            backgroundColor: 'unset',
          },
          '&.Mui-selected': {
            color: muiTheme.palette.primary.main,
            bgcolor: 'transparent',
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'transparent',
          },
        }}
      >
        Completed
      </ToggleButton>
    </ToggleButtonGroup>
  )
}

export default TodoFilter
