import { useEffect } from 'react'
import { useSetHeader } from './HeaderContext'
import EmbedTemplate from './EmbedTemplate'

const Analytics = () => {
  const setHeader = useSetHeader()

  useEffect(() => {
    setHeader({ title: 'Analytics' })
  }, [setHeader])

  const workspaceId = '63ffdf33da3dda744f848cde'

  return <EmbedTemplate workspaceId={workspaceId} />
}
export default Analytics