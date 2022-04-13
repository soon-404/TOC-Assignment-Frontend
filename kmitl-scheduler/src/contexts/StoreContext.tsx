import { createContext, ReactNode, Dispatch, useState, SetStateAction, FC, useEffect } from 'react'
import { Course, ClassYear, ApiTablesData } from 'types'

import { httpClient } from 'api/httpClient'

interface IStoreContext {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  classYear: ClassYear | null
  setClassYear: Dispatch<SetStateAction<ClassYear | null>>
  freeCourses: Course[]
  setFreeCourses: Dispatch<SetStateAction<Course[]>>
  selectedCourses: Course[]
  setSelectedCourses: Dispatch<SetStateAction<Course[]>>
  isAllCourseLoading: boolean
  allCourseErrorMsg: string | false
}

interface StoreProviderProps {
  children: ReactNode
}

export const StoreContext = createContext<IStoreContext>({} as IStoreContext)

export const StoreProvider: FC<StoreProviderProps> = ({ children }) => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [classYear, setClassYear] = useState<ClassYear | null>('3') // TODO : set default `null`

  const [allCourses, setAllCourses] = useState<Course[] | undefined>()
  const [freeCourses, setFreeCourses] = useState<Course[]>([])
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([])

  const [isAllCourseLoading, setIsAllCourseLoading] = useState<boolean>(false)
  const [allCourseErrorMsg, setAllCourseErrorMsg] = useState<string | false>(false)

  useEffect(() => {
    const fetchTables = async () => {
      setIsAllCourseLoading(true)

      const {
        data: { data: courses, success },
      } = await httpClient.get<ApiTablesData>('/tables')
      if (!success) {
        setAllCourseErrorMsg('something wrong')
        setIsAllCourseLoading(false)
        return
      }

      setAllCourses(courses)
      setIsAllCourseLoading(false)
    }

    fetchTables()
  }, [])

  useEffect(() => {
    if (!allCourses) return

    if (activeStep === 1) {
      const suggestCourses = allCourses.filter((course) => course.class_year === classYear)
      setFreeCourses(suggestCourses)
    }
  }, [activeStep, allCourses])

  const _value = {
    activeStep,
    setActiveStep,
    classYear,
    setClassYear,
    freeCourses,
    setFreeCourses,
    selectedCourses,
    setSelectedCourses,
    isAllCourseLoading,
    allCourseErrorMsg,
  }

  return <StoreContext.Provider value={_value}>{children}</StoreContext.Provider>
}
