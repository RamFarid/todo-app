import DesktopHandlers from './components/DesktopHandlers'
import Header from './components/Header'
import TodoInput from './components/TodoInput'
import TodoItem from './components/TodoItem'
import TodoList from './components/TodoList'
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from './contexts/ThemeContext'
import TodoFilter from './components/TodoFilter'
import { useUser } from './contexts/UserContext'
import Form from './components/Form'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTodos } from './contexts/TodosContext'
function App() {
  const [theme] = useTheme()
  const { user, isLoading } = useUser()
  const { todos, filteredTodos, isLoading: isTodosLoading } = useTodos()
  const isMobile = useMediaQuery((muiTheme) => muiTheme.breakpoints.down('sm'))
  return (
    <Box
      minHeight={'100vh'}
      sx={{
        backgroundImage: `url(/bg-desktop-${theme}.jpg)`,
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Container maxWidth='sm' sx={{ py: 9 }}>
        <Header />
        {user && <TodoInput />}
        <Paper
          elevation={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: user ? 0 : 2.2,
            mt: user ? 0 : 3,
            minHeight: '200px',
            position: 'relative',
          }}
        >
          {isLoading || isTodosLoading ? (
            <CircularProgress
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                translate: '-50% -50%',
              }}
            />
          ) : user ? (
            <>
              <TodoList>
                {filteredTodos.length ? (
                  filteredTodos.map((todo) => (
                    <TodoItem todo={todo} key={todo.id} />
                  ))
                ) : (
                  <Typography
                    align='center'
                    color='primary'
                    height={'200px'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    Clean todos!
                  </Typography>
                )}
              </TodoList>
              {todos.length ? <DesktopHandlers isMobile={isMobile} /> : null}
            </>
          ) : (
            <Form />
          )}
        </Paper>
        {isMobile && user && todos.length ? (
          <Paper
            elevation={1}
            sx={{
              mt: 2.4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: 'background.default',
              p: 1.3,
            }}
          >
            <TodoFilter />
          </Paper>
        ) : null}
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </Container>
    </Box>
  )
}

export default App
