import { useEffect } from 'react'
import {
  useAuth,
  useLoginWithRedirect,
} from '@frontegg/react'
import { useNavigate } from 'react-router-dom'

function Private() {
    const { isAuthenticated } = useAuth()
    const loginWithRedirect = useLoginWithRedirect()
    const navigate = useNavigate()
  
    useEffect(() => {
      if (!isAuthenticated) {
        console.log('user is not logged-on. going to loginWithRedirect')
        localStorage.setItem('_REDIRECT_AFTER_LOGIN_', window.location.pathname)
        loginWithRedirect()
      }
    }, [isAuthenticated, loginWithRedirect])
  
    return isAuthenticated ? (
      <div>
        <h1>Private</h1>
        <button onClick={() => navigate('/')}>Go home</button>
      </div>
    ) : (
      <div />
    )
  }

  export default Private