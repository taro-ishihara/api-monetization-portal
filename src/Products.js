import { useEffect, useState } from 'react'
import { useAuth } from '@frontegg/react'
import { FronteggContext } from '@frontegg/rest-api'
import SubscribeButton from './SubscribeButton'

function Products() {
  const { isAuthenticated } = useAuth()
  const [products, setProducts] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [subscribed, setSubscribed] = useState(false)

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
          console.log(responseJson)
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
          console.log(responseJson)
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
    .map((product) => <li key={product.id}>{product.name}</li>)

  const inactiveProductsList = products
    .filter(
      (product) => !subscriptions.some((sub) => sub.plan.product === product.id)
    )
    .map((product) => (
      <li key={product.id}>
        {product.name}
        <SubscribeButton {...{product, subscribed, setSubscribed}} />
      </li>
    ))

  return (
    <>
      <h2>Active Subscriptions</h2>
      <ul>{activeProductsList}</ul>
      <h2>Inactive Subscriptions</h2>
      <ul>{inactiveProductsList}</ul>
    </>
  )
}

export default Products
