import { useEffect } from 'react'
import { useSetHeader } from './HeaderContext'

const Status = () => {
  const setHeader = useSetHeader()

  useEffect(() => {
    setHeader({ title: 'Status' })
  }, [setHeader])

  return (
    <iframe
      title="Status Dashboard"
      src="https://us3.datadoghq.com/graph/embed?token=c08d7c66febdea331999ef04a1de23ca04d38823465afea5f2dc6e927d97dddf&height=400&width=800&legend=true"
      width="800"
      height="400"
      frameborder="0"
    ></iframe>
  )
}
export default Status
