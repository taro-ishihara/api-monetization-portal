import { useEffect } from 'react'
import {
  useAuth,
  useLoginWithRedirect,
  AdminPortal,
  useTenantsState,
} from '@frontegg/react'
import { ContextHolder, FronteggContext } from '@frontegg/rest-api'
import { useNavigate } from 'react-router-dom'
import Products from './Products'
import CustomerPortalButton from './CustomerPortalButton'

function Home() {
    const { user, isAuthenticated } = useAuth()
    const tenantsState = useTenantsState()
    const loginWithRedirect = useLoginWithRedirect()
    const navigate = useNavigate()
  
    console.log('user - ', user)
    console.log('isAuthenticated - ', isAuthenticated)
    console.log('tenants - ', tenantsState?.tenants)
  
    useEffect(() => {
      if (!isAuthenticated) {
        console.log('user is not logged-on. going to loginWithRedirect')
        localStorage.setItem('_REDIRECT_AFTER_LOGIN_', window.location.pathname)
        loginWithRedirect()
      }
    }, [isAuthenticated, loginWithRedirect])
  
    const logout = () => {
      const baseUrl = ContextHolder.getContext().baseUrl
      window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`
    }
  
    const originalRoute = localStorage.getItem('_REDIRECT_AFTER_LOGIN_')
    console.log('originalRoute - ', originalRoute)
    const token = FronteggContext.getAccessToken()
    console.log('token - ', token)
    if (isAuthenticated && originalRoute) {
      navigate(originalRoute)
      localStorage.removeItem('_REDIRECT_AFTER_LOGIN_')
    }
  
    return (
      <div className="App">
        {isAuthenticated ? (
          <div>
            <div>
              <span>Logged in as: {user?.name}</span>
            </div>
            <div>
              <button onClick={() => alert(user.accessToken)}>
                What is my access token?
              </button>
            </div>
            <div>
              <button onClick={() => AdminPortal.show()}>
                Open admin portal
              </button>
            </div>
            <div>
              <button onClick={() => logout()}>Click to logout</button>
            </div>
            <CustomerPortalButton />
            <Products />
          </div>
        ) : (
          <div>
            <button onClick={() => loginWithRedirect()}>Click me to login</button>
            <button onClick={() => navigate('/private')}>
              Go to private route
            </button>
          </div>
        )}
      </div>
    )
  }

  export default Home