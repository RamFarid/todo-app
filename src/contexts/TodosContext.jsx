import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  writeBatch,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useUser } from './UserContext'
import { toast } from 'react-toastify'

const TodosContext = createContext()

export function useTodos() {
  return useContext(TodosContext)
}

function TodosContextProvider({ children }) {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const { user, isLoading: isUserLoading } = useUser()

  const filteredTodos = useMemo(() => {
    if (filter === 'all') return todos
    if (filter === 'active') return todos.filter((t) => !t.checked)
    if (filter === 'completed') return todos.filter((t) => t.checked)
  }, [filter, todos])

  useEffect(() => {
    if (user && !isUserLoading) {
      setIsLoading(true)
      getDocs(query(collection(db, 'todos'), where('uid', '==', user?.uid)))
        .then((snapshot) => {
          if (!snapshot.empty) {
            const data = []
            snapshot.forEach((ss) =>
              data.push({
                ...ss.data(),
                id: ss.id,
                createdAt: ss._document.createTime.timestamp.toMillis(),
              })
            )
            const soretedData = data.sort((a, b) => b.createdAt - a.createdAt)
            setTodos(soretedData)
          }
        })
        .catch((e) => {
          toast.error(e.message + ': While get todos')
          console.log(e.message)
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else if (!user && isUserLoading) {
      setIsLoading(false)
    }
  }, [user, isUserLoading])

  const addTodo = (todo) => {
    setTodos((pre) => [todo, ...pre])
  }

  const removeTodo = (todo) => {
    setTodos(todos.filter((t) => t.id !== todo.id))
  }

  const editTodo = (todo) => {
    setTodos(
      todos.map((t) => {
        if (t.id === todo.id) {
          return todo
        }
        return t
      })
    )
  }

  const removeCompleted = async () => {
    try {
      const batch = writeBatch(db)
      todos.forEach((todo) => {
        if (todo.checked) batch.delete(doc(db, 'todos', todo.id))
      })
      await batch.commit()
      setTodos(todos.filter((t) => !t.checked))
    } catch (error) {
      toast.error(error.message)
    }
  }

  const reset = () => {
    setTodos([])
    setFilter('all')
  }

  return (
    <TodosContext.Provider
      value={{
        todos,
        filteredTodos,
        isLoading,
        addTodo,
        filter,
        removeTodo,
        editTodo,
        setFilter,
        reset,
        removeCompleted,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}

TodosContextProvider.propTypes = {
  children: PropTypes.element,
}

export default TodosContextProvider
