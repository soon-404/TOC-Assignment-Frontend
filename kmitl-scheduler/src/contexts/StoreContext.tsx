import { createContext, ReactNode, Dispatch, useState, SetStateAction, FC } from 'react'
import { Course, ClassYear } from 'types'

import { courses } from 'mock/courses'

interface IStoreContext {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  classYear: ClassYear | null
  setClassYear: Dispatch<SetStateAction<ClassYear | null>>
  freeCourses: Course[]
  setFreeCourses: Dispatch<SetStateAction<Course[]>>
  selectedCourses: Course[]
  setSelectedCourses: Dispatch<SetStateAction<Course[]>>
}

interface StoreProviderProps {
  children: ReactNode
}

export const StoreContext = createContext<IStoreContext>({} as IStoreContext)

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const [activeStep, setActiveStep] = useState<number>(1) // TODO : set default '0'
  const [classYear, setClassYear] = useState<ClassYear | null>('3') // TODO : set default `null`

  const [freeCourses, setFreeCourses] = useState<Course[]>(courses)
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([])

  const _value = {
    activeStep,
    setActiveStep,
    classYear,
    setClassYear,
    freeCourses,
    setFreeCourses,
    selectedCourses,
    setSelectedCourses,
  }

  return <StoreContext.Provider value={_value}>{children}</StoreContext.Provider>
}
