import React, { ReactNode, useState } from 'react'
import { Pee } from 'types'

interface IStoreContext {
  activeStep: number
  pee: Pee
  setActiveStep: (value: number) => void
  setPee: (pee: Pee) => void
}

export const StoreContext = React.createContext<IStoreContext>({} as IStoreContext)

interface StoreProviderProps {
  children: ReactNode
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [activeStep, _setActiveStep] = useState<number>(0)
  const [pee, setPee] = useState<Pee>('')

  const setActiveStep = (value: number) => _setActiveStep(value)

  return <StoreContext.Provider value={{ activeStep, setActiveStep, pee, setPee }}>{children}</StoreContext.Provider>
}
