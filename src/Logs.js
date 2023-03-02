import { useEffect } from 'react'
import { useSetHeader } from './HeaderContext'
import EmbedTemplate from './EmbedTemplate'

const Logs = () => {
  const setHeader = useSetHeader()

  useEffect(() => {
    setHeader({ title: 'Logs' })
  }, [setHeader])

  const workspaceId = '63ffa7bbda3dda744f848164'

  return <EmbedTemplate workspaceId={workspaceId} />
}
export default Logs