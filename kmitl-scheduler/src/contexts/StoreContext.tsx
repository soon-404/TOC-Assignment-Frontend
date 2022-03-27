import React, { ReactNode, useMemo, useState } from 'react'
import { Pee } from 'types/types'

interface IStoreContext {
  activeStep: number
  setActiveStep: (value: number) => void
  pee: Pee
  setPee: (pee: Pee) => void
}

export const StoreContext = React.createContext<IStoreContext>({} as IStoreContext)

interface Props {
  children: ReactNode
}

export const StoreProvider: React.FC<Props> = ({ children }) => {
  const [activeStep, _setActiveStep] = useState<number>(0)
  const [pee, setPee] = useState<Pee>('')

  const setActiveStep = (value: number) => _setActiveStep(value)

  const value = useMemo(
    () => ({
      activeStep,
      setActiveStep,
      pee,
      setPee,
    }),
    [activeStep, pee],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
