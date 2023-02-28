import { FronteggContext } from '@frontegg/rest-api'

const onClickSubscribe = async (productId) => {
  try {
    const response = await fetch(
      'https://etjkre2b9g.execute-api.us-west-1.amazonaws.com/dev/subscribe',
      {
        method: 'POST',
        headers: {
          Authorization: FronteggContext.getAccessToken(),
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({ productId: productId }),
      }
    )
    if (response.ok) {
      console.log('subscribed')
    }
  } catch {
    console.log('error')
  }
}
const SubscribeButton = ({product, subscribed, setSubscribed}) => {
  return (
    <>
      <button
        onClick={async () => {
          await onClickSubscribe(product.id)
          setSubscribed(!subscribed)
        }}
      >
        Subscribe
      </button>
    </>
  )
}

export default SubscribeButton
