import './App.css'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import {
  useAuth,
  useLoginWithRedirect,
  useTenantsState,
} from '@frontegg/react'
import { FronteggContext } from '@frontegg/rest-api'
import { useNavigate } from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Navigator from './Navigator'
import Header from './Header'
import Overview from './Overview'
import Subscriptions from './Subscriptions'
import Usage from './Usage'
import Logs from './Logs'
import Analytics from './Analytics'
import Private from './Private'
import { HeaderProvider } from './HeaderContext'
import Copyright from './Copyright'

let theme = createTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#008803',
      dark: '#006db3',
    },
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiTab: {
      defaultProps: {
        disableRipple: true,
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
})

theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#081627',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: theme.spacing(1),
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgb(255,255,255,0.15)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#65ce67',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
  },
}

const drawerWidth = 256

function App() {
  const { user, isAuthenticated } = useAuth()
  console.log('user - ', user)
  console.log('isAuthenticated - ', isAuthenticated)

  const loginWithRedirect = useLoginWithRedirect()

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('user is not logged-on. going to loginWithRedirect')
      localStorage.setItem('_REDIRECT_AFTER_LOGIN_', window.location.pathname)
      loginWithRedirect()
    }
  }, [isAuthenticated, loginWithRedirect])

  const originalRoute = localStorage.getItem('_REDIRECT_AFTER_LOGIN_')
  console.log('originalRoute - ', originalRoute)

  const navigate = useNavigate()
  if (isAuthenticated && originalRoute) {
    navigate(originalRoute)
    localStorage.removeItem('_REDIRECT_AFTER_LOGIN_')
  }

  const token = FronteggContext.getAccessToken()
  console.log('token - ', token)
  const tenantsState = useTenantsState()
  console.log('tenants - ', tenantsState?.tenants)

  return (
    <ThemeProvider theme={theme}>
      {isAuthenticated ? (
        <>
          <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
              <Navigator
                PaperProps={{ style: { width: drawerWidth } }}
                sx={{ display: { sm: 'block', xs: 'none' } }}
              />
            </Box>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <HeaderProvider>
                <Header />
                <Routes>
                  <Route path="/" element={<Overview />} />
                  <Route path="/subscriptions" element={<Subscriptions />} />
                  <Route path="/usage" element={<Usage />} />
                  <Route path="/logs" element={<Logs />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/private" element={<Private />} />
                </Routes>
              </HeaderProvider>
              <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
                <Copyright />
              </Box>
            </Box>
          </Box>
        </>
      ) : (
        <></>
      )}
    </ThemeProvider>
  )
}

export default App
