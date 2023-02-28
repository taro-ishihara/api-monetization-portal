import { useEffect } from 'react'
import {
  useAuth,
  useLoginWithRedirect,
  useTenantsState,
} from '@frontegg/react'
import { FronteggContext } from '@frontegg/rest-api'
import { useNavigate } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh'

import Products from './Products'

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
      <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon color="inherit" sx={{ display: 'block' }} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Search by email address, phone number, or user UID"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 'default' },
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <Button variant="contained" sx={{ mr: 1 }}>
                  Add user
                </Button>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
          No users for this project yet
        </Typography>
      </Paper>
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
