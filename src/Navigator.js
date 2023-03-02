import { useLocation, NavLink } from 'react-router-dom'

import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import HomeIcon from '@mui/icons-material/Home'
import DataObjectIcon from '@mui/icons-material/DataObject'
import SettingsIcon from '@mui/icons-material/Settings'
import DataUsageIcon from '@mui/icons-material/DataUsage'
import ReceiptIcon from '@mui/icons-material/Receipt'
import QueryStatsIcon from '@mui/icons-material/QueryStats'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ListIcon from '@mui/icons-material/List'

const categories = [
  {
    id: 'Management',
    children: [
      { id: 'Subscriptions', icon: <DataObjectIcon />, to: '/subscriptions' },
      { id: 'Usage', icon: <DataUsageIcon />, to: '/usage' },
      { id: 'Billing', icon: <ReceiptIcon />, to: '/billing' },
    ],
  },
  {
    id: 'Quality',
    children: [
      { id: 'Status', icon: <CheckCircleIcon />, to: '/status' },
      { id: 'Logs', icon: <ListIcon />, to: '/logs' },
      { id: 'Analytics', icon: <QueryStatsIcon />, to: '/analytics' },
    ],
  },
  {
    id: 'Others',
    children: [
        { id: 'Settings', icon: <SettingsIcon />, to: '/settings' },
    ],
  }
]

const item = {
  py: '2px',
  px: 3,
  color: 'rgba(255, 255, 255, 0.7)',
  '&:hover, &:focus': {
    bgcolor: 'rgba(255, 255, 255, 0.08)',
  },
}

const itemCategory = {
  boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
  py: 1.5,
  px: 3,
}

export default function Navigator(props) {
  const { ...other } = props

  const location = useLocation()

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}
        >
          JREast Data Mart
        </ListItem>
        <ListItem component={NavLink} to='/' sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Overview</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, to }) => (
              <ListItem  key={childId} disablePadding component={NavLink}
              to={to}>
                <ListItemButton
                  selected={location.pathname===to}
                  sx={item}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  )
}
