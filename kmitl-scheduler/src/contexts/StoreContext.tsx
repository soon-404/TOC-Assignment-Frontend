import { createContext, ReactNode, Dispatch, useState, SetStateAction, FC, useEffect, useReducer } from 'react'
import { Course, CourseWithSection, ClassYear, ApiTablesData, SectionType } from 'types'

import { httpClient } from 'api/httpClient'

interface IStoreContext {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  classYear: ClassYear | null
  setClassYear: Dispatch<SetStateAction<ClassYear | null>>
  freeCourses: CourseWithSection[]
  setFreeCourses: Dispatch<SetStateAction<CourseWithSection[]>>
  selectedCourses: CourseWithSection[]
  setSelectedCourses: Dispatch<SetStateAction<CourseWithSection[]>>
  isAllCourseLoading: boolean
  allCourseErrorMsg: string | false
}

type State = {
  data?: HNResponse
  isLoading: boolean
  error?: string
}

type HNResponse = {
  hits: {
    title: string
    objectID: string
    url: string
  }[]
}

type Action = { type: 'request' } | { type: 'success'; results: HNResponse } | { type: 'failure'; error: string }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'request':
      return { isLoading: true }
    case 'success':
      return { isLoading: false, data: action.results }
    case 'failure':
      return { isLoading: false, error: action.error }
  }
}

interface StoreProviderProps {
  children: ReactNode
}

export const StoreContext = createContext<IStoreContext>({} as IStoreContext)

export const StoreProvider: FC<StoreProviderProps> = ({ children, reducer }) => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [classYear, setClassYear] = useState<ClassYear | null>('2') // TODO : set default `null`

  const [allCourses, setAllCourses] = useState<Course[] | undefined>()
  const [freeCourses, setFreeCourses] = useState<CourseWithSection[]>([])
  const [selectedCourses, setSelectedCourses] = useState<CourseWithSection[]>([])

  const [isAllCourseLoading, setIsAllCourseLoading] = useState<boolean>(false)
  const [allCourseErrorMsg, setAllCourseErrorMsg] = useState<string | false>(false)

  const [state, dispatch] = useReducer(reducer, { isLoading: false })

  // * Enable this to log `allCourses`
  // useEffect(() => console.log('all courses', allCourses), [allCourses])
  // useEffect(
  //   () =>
  //     console.log(
  //       'all courses',
  //       allCourses?.find((course) => course.name === 'DEVELOPMENT OF READING AND WRITING SKILLS IN ENGLISH'),
  //     ),
  //   [allCourses],
  // )

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

      setAllCourses(courses.filter((course) => !!course && !!course?.id && !!course?.section))
      setIsAllCourseLoading(false)
    }

    fetchTables()
  }, [])

  useEffect(() => {
    if (!allCourses) return

    if (activeStep === 1) {
      const suggestCourses: CourseWithSection[] = allCourses
        .filter((course) => course.class_year === classYear)
        .map((course) => ({
          course: course,
          sectionPractice: course.section.find((section) => section?.type === SectionType.Practice),
          sectionTheory: course.section.find((section) => section?.type === SectionType.Theory),
        }))
      setFreeCourses(suggestCourses)
    }
  }, [activeStep, allCourses])

  const _value = {
    activeStep, //  step การทำงานที่กำลัง active อยู่ตอนนี้
    setActiveStep,
    classYear,
    setClassYear,
    freeCourses,
    setFreeCourses,
    selectedCourses, // วิชาที่ user เลือก
    setSelectedCourses,
    isAllCourseLoading,
    allCourseErrorMsg,
  }

  return <StoreContext.Provider value={_value}>{children}</StoreContext.Provider>
}
