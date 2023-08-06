import { Stack, TextField } from '@mui/material'
import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'
import { db } from '../firebase'
import { useUser } from '../contexts/UserContext'
import { toast } from 'react-toastify'
import { useTodos } from '../contexts/TodosContext'

function TodoInput() {
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()
  const { addTodo } = useTodos()
  return (
    <Stack
      bgcolor='background.paper'
      my={2}
      borderRadius={'4px'}
      overflow={'hidden'}
      boxShadow={2}
      role='listitem'
      sx={{
        backgroundImage:
          'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
      }}
    >
      <TextField
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            if (!title.trim()) return setError('Missing the title')
            try {
              setIsLoading(true)
              const todo = {
                title,
                uid: user.uid,
                checked: false,
              }
              const doc = await addDoc(collection(db, 'todos'), todo)
              addTodo({ ...todo, id: doc.id })
              setTitle('')
            } catch (error) {
              toast.error(error.message)
            } finally {
              setIsLoading(false)
            }
          }
        }}
        fullWidth
        error={Boolean(error.length)}
        helperText={error}
        disabled={isLoading}
        size='small'
        placeholder='Add Todo'
        value={title}
        onChange={(e) => {
          setTitle(e.target.value)
          setError('')
        }}
      />
    </Stack>
  )
}

export default TodoInput
