import { Box, Button, TextField, Typography } from '@mui/material'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { auth } from '../firebase'
import { toast } from 'react-toastify'
function Form() {
  const [signUp, setSignUp] = useState(false)
  const [errors, setErrors] = useState({
    email: '',
    name: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const submithandler = async (e) => {
    e.preventDefault()
    const password = e.target.password.value?.trim()
    const email = e.target.email.value?.trim()
    const name = e.target.name.value?.trim()
    if (!password) {
      setErrors((pre) => ({ ...pre, password: 'Missing password' }))
      return
    }
    if (!email) {
      setErrors((pre) => ({ ...pre, email: 'Missing email' }))
      return
    }
    if (signUp && !name) {
      setErrors((pre) => ({ ...pre, name: 'Missing name' }))
      return
    }
    console.log(name, email, password)
    try {
      setIsLoading(true)
      if (signUp) {
        const cred = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(cred.user, {
          displayName: name,
        })
        setSignUp(false)
        return toast.success('Success register')
      }
      await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <Box component='form' onSubmit={submithandler}>
      <Typography variant='h6' component='h2'>
        Required login to continue
      </Typography>
      {signUp && (
        <TextField
          label='Name'
          name='name'
          type='text'
          required
          size='small'
          fullWidth
          margin='dense'
          error={Boolean(errors.name.length)}
          helperText={errors.name}
        />
      )}
      <TextField
        error={Boolean(errors.email.length)}
        helperText={errors.email}
        name='email'
        label='Email'
        type='email'
        required
        size='small'
        fullWidth
        margin='dense'
      />
      <TextField
        error={Boolean(errors.password.length)}
        label='Password'
        helperText={errors.password}
        type='password'
        name='password'
        required
        size='small'
        fullWidth
        margin='dense'
      />
      <Typography my={1.8}>
        {signUp ? 'Already have an account?' : <>{"Don't"} have an account? </>}
        <Button variant='text' onClick={() => setSignUp((pre) => !pre)}>
          {signUp ? 'Login' : 'Sign up'}
        </Button>
      </Typography>
      <Button
        type='submit'
        variant='contained'
        fullWidth
        disableElevation
        disabled={isLoading}
      >
        {signUp ? 'Signup' : 'Login'}
      </Button>
    </Box>
  )
}

Form.propTypes = {
  signUp: PropTypes.bool,
}

export default Form
