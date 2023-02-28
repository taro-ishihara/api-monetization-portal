import { useAuth } from '@frontegg/react'
import { FronteggContext } from '@frontegg/rest-api'

const CustomerPortalButton = () => {
  const { isAuthenticated } = useAuth()

  const customerPortalClick = () => {
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
    if (isAuthenticated) {
      createCustomerPortalSession()
    }
  }

  return (
    <div>
      <button onClick={customerPortalClick}>Customer Portal</button>
    </div>
  )
}

export default CustomerPortalButton
