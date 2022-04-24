import { createContext, ReactNode, Dispatch, useState, SetStateAction, FC, useEffect, useReducer, Reducer } from 'react'
import { ActionType, State as ReducerState, Action as ReducerAction } from 'reducers/course'
import { useCredit, CreditAction, CreditState } from 'hooks/useCredit'
import { ClassYear, CourseId, Section, SectionType, Course } from 'types'
import { courseService } from 'services/course'

interface IStoreContext extends ReducerState, CreditAction, CreditState {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  classYear: ClassYear | null
  setClassYear: Dispatch<SetStateAction<ClassYear | null>>
  initExternalCourse: (courses: Course[]) => void
  addCourse: (courseId: CourseId) => void
  deleteCourse: (courseId: CourseId) => void
  setSection: (courseId: CourseId, section: Section, sectionType: SectionType) => void
}

interface StoreProviderProps {
  children: ReactNode
  reducer: Reducer<ReducerState, ReducerAction>
  initialState: ReducerState
}

export const StoreContext = createContext<IStoreContext>({} as IStoreContext)

export const StoreProvider: FC<StoreProviderProps> = ({ children, reducer, initialState }) => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [classYear, setClassYear] = useState<ClassYear | null>('2') // TODO : set default `null`
  const [state, dispatch] = useReducer(reducer, initialState)

  const { initAllCredit, ...restCreditState } = useCredit()

  const initExternalCourse = (courses: Course[]) => dispatch({ type: ActionType.InitExternal, courses })
  const addCourse = (courseId: CourseId) => dispatch({ type: ActionType.Add, courseId })
  const deleteCourse = (courseId: CourseId) => dispatch({ type: ActionType.Delete, courseId })

  const setSection = (courseId: CourseId, section: Section, sectionType: SectionType) =>
    dispatch({ type: ActionType.SetSection, courseId, section, sectionType })

  // * For log
  useEffect(() => {
    console.log('StoreContext', state.selectedCourses, state.unselectedCourses, state.externalUnselectedCourses)
  }, [state])

  useEffect(() => {
    const fetchTables = async () => {
      if (!classYear) return

      // * Swap this
      // const _courses = await courseService.getAllCourse()
      const _courses = await courseService.getCourseByClassYear(classYear)

      dispatch({ type: ActionType.Init, courses: _courses, classYear: classYear })
    }
    fetchTables()
  }, [classYear])

  const value = {
    activeStep, //  step การทำงานที่กำลัง active อยู่ตอนนี้
    setActiveStep,
    classYear,
    setClassYear,
    initExternalCourse,
    addCourse,
    deleteCourse,
    setSection,
    initAllCredit,
    ...restCreditState,
    ...state,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
