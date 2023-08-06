import { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
const UserContext = createContext()

export function useUser() {
  return useContext(UserContext)
}

function UserContextProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (c) => {
      setUser(c ? c : null)
      setIsLoading(false)
      console.log('first')
    })

    return () => {
      unsub()
    }
  }, [])
  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.element,
}

export default UserContextProvider
