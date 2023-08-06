import { Button, Divider, Stack, Typography } from '@mui/material'
import TodoFilter from './TodoFilter'
import PropTypes from 'prop-types'
import { useTodos } from '../contexts/TodosContext'
function DesktopHandlers({ isMobile }) {
  const { todos, removeCompleted } = useTodos()
  return (
    <>
      <Stack
        direction='row'
        justifyContent={'space-between'}
        alignItems='center'
        mt={'auto'}
        p={1.2}
        position={'relative'}
      >
        <Divider
          sx={{
            position: 'absolute',
            top: '0',
            left: '50%',
            translate: '-50% 0',
          }}
        />
        <Typography color='text.secondary' fontSize={'14px'}>
          {todos.filter((e) => !e.checked).length} items left
        </Typography>
        {!isMobile && <TodoFilter />}
        <Button
          variant='text'
          sx={{ color: 'text.secondary' }}
          onClick={removeCompleted}
        >
          Clear completed
        </Button>
      </Stack>
    </>
  )
}

DesktopHandlers.propTypes = {
  isMobile: PropTypes.bool,
}

export default DesktopHandlers
