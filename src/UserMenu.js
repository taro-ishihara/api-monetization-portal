import { useAuth, AdminPortal } from '@frontegg/react'

import { ContextHolder, FronteggContext } from '@frontegg/rest-api'

import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import PaymentIcon from '@mui/icons-material/Payment'
import LogoutIcon from '@mui/icons-material/Logout'

const UserMenu = ({ anchorEl, setAnchorEl }) => {
  const { user } = useAuth()
  const open = Boolean(anchorEl)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`
  }

  const navigateToCustomerPortal = () => {
    const createCustomerPortalSession = async () => {
      try {
        const response = await fetch(
          'https://etjkre2b9g.execute-api.us-west-1.amazonaws.com/dev/create_customer_portal_session',
          {
            method: 'POST',
            headers: {
              Authorization: FronteggContext.getAccessToken(),
            },
          }
        )
        if (response.ok) {
          const responseJson = await response.json()
          window.open(responseJson.url)
        }
      } catch {
        console.log('error')
      }
    }
    createCustomerPortalSession()
  }
  return (
    <>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            AdminPortal.show()
          }}
        >
          <Avatar src={user.profilePictureUrl} />
          Account
        </MenuItem>
        <Divider />
        <MenuItem onClick={navigateToCustomerPortal}>
          <ListItemIcon>
            <PaymentIcon fontSize="small" />
          </ListItemIcon>
          Set Payment
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  )
}

export default UserMenu
