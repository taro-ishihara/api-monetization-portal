import { useEffect, useState } from 'react'
import { useAuth } from '@frontegg/react'
import { FronteggContext } from '@frontegg/rest-api'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListSubheader from '@mui/material/ListSubheader'
import Divider from '@mui/material/Divider'

import SearchIcon from '@mui/icons-material/Search'
import RefreshIcon from '@mui/icons-material/Refresh'
import DataArrayIcon from '@mui/icons-material/DataArray'

import { useSetHeader } from './HeaderContext'
import SubscribeButton from './SubscribeButton'

function Subscriptions() {
  const setHeader = useSetHeader()

  useEffect(() => {
    setHeader({ title: 'Subscriptions' })
  }, [setHeader])

  const { isAuthenticated } = useAuth()
  const [products, setProducts] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [subscribed, setSubscribed] = useState(false)

  const subscribeToggle = () => {
    setSubscribed(!subscribed)
  }

  useEffect(() => {
    const listProducts = async () => {
      try {
        const response = await fetch(
          'https://etjkre2b9g.execute-api.us-west-1.amazonaws.com/dev/products',
          {
            headers: {
              Authorization: FronteggContext.getAccessToken(),
            },
          }
        )
        if (response.ok) {
          const responseJson = await response.json()
          setProducts(responseJson)
        }
      } catch {
        console.log('error')
      }
    }
    if (isAuthenticated) {
      listProducts()
    }
  }, [isAuthenticated])

  useEffect(() => {
    const listSubscriptions = async () => {
      try {
        const response = await fetch(
          'https://etjkre2b9g.execute-api.us-west-1.amazonaws.com/dev/subscriptions',
          {
            headers: {
              Authorization: FronteggContext.getAccessToken(),
            },
          }
        )
        if (response.ok) {
          const responseJson = await response.json()
          setSubscriptions(responseJson)
        }
      } catch {
        console.log('error')
      }
    }
    if (isAuthenticated) {
      listSubscriptions()
    }
  }, [isAuthenticated, subscribed])

  const activeProductsList = products
    .filter((product) =>
      subscriptions.some((sub) => sub.plan.product === product.id)
    )
    .map((product) => (
      <ListItem
        key={product.id}
        secondaryAction={
          <Button disabled variant="contained" sx={{ mr: 1 }}>
            Subscribed
          </Button>
        }
      >
        <ListItemIcon>
          <DataArrayIcon />
        </ListItemIcon>
        <ListItemText primary={product.name} />
      </ListItem>
    ))

  const inactiveProductsList = products
    .filter(
      (product) => !subscriptions.some((sub) => sub.plan.product === product.id)
    )
    .map((product) => (
      <ListItem
        key={product.id}
        secondaryAction={<SubscribeButton product={product} subscribeToggle={subscribeToggle} />}
      >
        <ListItemIcon>
          <DataArrayIcon />
        </ListItemIcon>
        <ListItemText primary={product.name} />
      </ListItem>
    ))

  return (
    <div className="App">
      <Paper
        sx={{
          mt: 3,
          mb: 3,
          maxWidth: '96%',
          ml: 'auto',
          mr: 'auto',
          overflow: 'hidden',
        }}
      >
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
                  placeholder="Search by API name"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: 'default' },
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <Tooltip title="Reload">
                  <IconButton onClick={subscribeToggle}>
                    <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <List>
          <ListSubheader component="div" id="nested-list-subheader">
            購入済のAPI
          </ListSubheader>
          {activeProductsList}
          <Divider />
          <ListSubheader component="div" id="nested-list-subheader">
            購入可能なAPI
          </ListSubheader>
          {inactiveProductsList}
        </List>
      </Paper>
    </div>
  )
}

export default Subscriptions
