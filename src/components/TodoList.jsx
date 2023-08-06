import PropTypes from 'prop-types'
import { MenuList } from '@mui/material'

function TodoList({ children }) {
  return (
    <MenuList
      role='list'
      disablePadding
      sx={(theme) => ({
        '& > li:not(:last-child)': {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      })}
    >
      {children}
    </MenuList>
  )
}

TodoList.propTypes = {
  children: PropTypes.any,
}

export default TodoList
