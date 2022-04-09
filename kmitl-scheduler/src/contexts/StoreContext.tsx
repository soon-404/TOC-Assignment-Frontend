import { createContext, ReactNode, Dispatch, useState, SetStateAction, FC } from 'react'
import { Pee } from 'types'

interface IStoreContext {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  pee: Pee
  setPee: Dispatch<SetStateAction<Pee>>
}

interface StoreProviderProps {
  children: ReactNode
}

export const StoreContext = createContext<IStoreContext>({} as IStoreContext)

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const [activeStep, setActiveStep] = useState<number>(1) // TODO : set default '0'
  const [pee, setPee] = useState<Pee>('3') // TODO : set default `null`

  const _value = { activeStep, setActiveStep, pee, setPee }

  return <StoreContext.Provider value={_value}>{children}</StoreContext.Provider>
}
