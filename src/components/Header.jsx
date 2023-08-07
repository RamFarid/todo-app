import { Box, Button, Stack, Typography } from '@mui/material'
import ToggleThemeBtn from './ToggleThemeBtn'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'
import { useUser } from '../contexts/UserContext'
import { useTodos } from '../contexts/TodosContext'

function Header() {
  const { user } = useUser()
  const { reset } = useTodos()
  return (
    <Stack direction='row' justifyContent='space-between' alignItems='center'>
      <Typography variant='h3' component='h1' color='#fff'>
        TODOS{' '}
        <Typography component='span' display='block'>
          {user?.displayName}
        </Typography>
      </Typography>
      <Box>
        <ToggleThemeBtn />

        {user && (
          <Button
            onClick={() => {
              signOut(auth)
              reset()
            }}
          >
            Logout
          </Button>
        )}
      </Box>
    </Stack>
  )
}

export default Header
