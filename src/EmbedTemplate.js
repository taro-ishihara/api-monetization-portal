import { useState, useEffect } from 'react'
import { useAuth } from '@frontegg/react'
import { FronteggContext } from '@frontegg/rest-api'

const EmbedTemplate = ({ workspaceId }) => {
  const { isAuthenticated } = useAuth()
  const [url, setUrl] = useState()

  useEffect(() => {
    const createEmbedTemplateUrl = async () => {
      try {
        const response = await fetch(
          'https://etjkre2b9g.execute-api.us-west-1.amazonaws.com/dev/createembedtemplateurl',
          {
            method: 'POST',
            headers: {
              Authorization: FronteggContext.getAccessToken(),
            },
            body: JSON.stringify({ 'workspaceId': workspaceId }),
          }
        )
        if (response.ok) {
          const responseJson = await response.json()
          setUrl(
            responseJson.url + '&primary_color=%23008803&hide_header=true'
          )
        }
      } catch {
        console.log('error')
      }
    }
    if (isAuthenticated) {
      createEmbedTemplateUrl()
    }
  }, [isAuthenticated, workspaceId])

  return (
    <>
      <iframe
        id={workspaceId}
        title={workspaceId}
        src={url}
        name="Embed Template"
        frameborder="0"
        noresize="noresize"
        height="100%"
      ></iframe>
    </>
  )
}

export default EmbedTemplate
