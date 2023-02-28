import { useEffect } from 'react'
import { useSetHeader } from './HeaderContext'

const Overview = () => {
  const setHeader = useSetHeader()
  useEffect(() => {
    setHeader({title: 'Overview'})
  }, [setHeader])
}
export default Overview
