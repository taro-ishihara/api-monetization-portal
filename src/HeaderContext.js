import { useState, createContext, useContext } from 'react'

const HeaderContext = createContext()
const SetHeaderContext = createContext()

const HeaderProvider = ({ children }) => {
  const initState = {
    title: 'Subscriptions'
  }

  const [state, setState] = useState(initState)

  return (
    <HeaderContext.Provider value={state}>
      <SetHeaderContext.Provider value={setState}>
        {children}
      </SetHeaderContext.Provider>
    </HeaderContext.Provider>
  )
}

const useHeader = () => useContext(HeaderContext)
const useSetHeader = () => useContext(SetHeaderContext)

export { HeaderProvider, useHeader, useSetHeader }
