import {
  Box,
  CircularProgress,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Typography,
} from '@mui/material'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import PropTypes from 'prop-types'
import { db } from '../firebase'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useTodos } from '../contexts/TodosContext'

function TodoItem({ todo }) {
  const [deleteLoad, setDeleteLoad] = useState(false)
  const [editLoad, setEditLoad] = useState(false)
  const { removeTodo, editTodo } = useTodos()
  return (
    <MenuItem
      disabled={deleteLoad || editLoad}
      sx={{
        boxShadow: 'none', // Remove elevation (box-shadow)
        // pointerEvents: 'none',
        cursor: 'default',
      }}
      disableTouchRipple
    >
      <ListItemIcon
        sx={(theme) => ({
          background: todo.checked
            ? `linear-gradient(to bottom, ${theme.palette.action.active})`
            : 'transparent',
          borderRadius: '50%',
          border: todo.checked
            ? 'none'
            : `1px solid ${theme.palette.action.hover}`,
          width: '26px',
          height: '26px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: 'unset !important',
          mr: 1.3,
        })}
      >
        <IconButton
          onClick={async () => {
            try {
              setEditLoad(true)
              await updateDoc(doc(db, 'todos', todo.id), {
                checked: !todo.checked,
              })
              editTodo({
                ...todo,
                checked: !todo.checked,
              })
            } catch (error) {
              toast.error(error.message)
            } finally {
              setEditLoad(false)
            }
          }}
        >
          {editLoad ? (
            <CircularProgress
              sx={{ width: '26px !important', height: '26px !important' }}
            />
          ) : todo.checked ? (
            <Box
              component='img'
              src='/icon-check.svg'
              maxWidth={'100%'}
              maxHeight={'100%'}
            />
          ) : null}
        </IconButton>
      </ListItemIcon>
      <ListItemText>
        <Typography
          noWrap
          color='text.secondary'
          sx={{
            textDecoration: todo.checked ? 'line-through' : 'none',
          }}
        >
          {todo.title}
        </Typography>
      </ListItemText>
      <IconButton
        onClick={async () => {
          try {
            setDeleteLoad(true)
            await deleteDoc(doc(db, 'todos', todo.id))
            removeTodo(todo)
          } catch (error) {
            toast.error(error.message)
          } finally {
            setDeleteLoad(false)
          }
        }}
      >
        {deleteLoad ? (
          <CircularProgress
            sx={{ width: '26px !important', height: '26px !important' }}
          />
        ) : (
          <Box component='img' src='/icon-cross.svg' />
        )}
      </IconButton>
    </MenuItem>
  )
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    checked: PropTypes.bool,
  }),
}

export default TodoItem
