import { useEffect } from 'react'
import { useSetHeader } from './HeaderContext'
import EmbedTemplate from './EmbedTemplate'

const Usage = () => {
  const setHeader = useSetHeader()

  useEffect(() => {
    setHeader({ title: 'Usage' })
  }, [setHeader])

  const workspaceId = '63ffd8d54a20552131d00d98'

  return <EmbedTemplate workspaceId={workspaceId} />
}
export default Usage