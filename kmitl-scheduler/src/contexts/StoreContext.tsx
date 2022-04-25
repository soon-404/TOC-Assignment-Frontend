import { createContext, ReactNode, Dispatch, useState, SetStateAction, FC, useEffect, useReducer, Reducer } from 'react'
import { ActionType, State as ReducerState, Action as ReducerAction } from 'reducers/course'
import { useCredit, CreditAction, CreditState } from 'hooks/useCredit'
import { ClassYear, CourseId, Section, SectionType, Course } from 'types'
import { courseService } from 'services/course'
import { transcriptService } from 'services/transcript'
import { getClassYearFromStudentId } from 'utils/classYear'
import { addCredit, isEnoughCredit, subCredit } from 'utils/credit'
import { BASE_CREDIT, MAXIMUM_CREDIT } from 'constants'
import { cloneDeep, set } from 'lodash'

interface IStoreContext extends ReducerState, CreditAction, CreditState {
  activeStep: number
  setActiveStep: Dispatch<SetStateAction<number>>
  classYear: ClassYear | null
  setClassYear: Dispatch<SetStateAction<ClassYear | null>>
  initExternalCourse: (courses: Course[]) => void
  addCourse: (courseId: CourseId) => void
  deleteCourse: (courseId: CourseId) => void
  setSection: (courseId: CourseId, section: Section, sectionType: SectionType) => void
  handleSendTranscript: (files: File[]) => Promise<void>
}

interface StoreProviderProps {
  children: ReactNode
  reducer: Reducer<ReducerState, ReducerAction>
  initialState: ReducerState
}

export const StoreContext = createContext<IStoreContext>({} as IStoreContext)

export const StoreProvider: FC<StoreProviderProps> = ({ children, reducer, initialState }) => {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [classYear, setClassYear] = useState<ClassYear | null>(null)
  const [state, dispatch] = useReducer(reducer, initialState)

  const { initAllCredit, usedCredit, setUsedCredit } = useCredit()

  const initExternalCourse = (courses: Course[]) => dispatch({ type: ActionType.InitExternal, courses })
  const addCourse = (courseId: CourseId) => {
    const courseData = state.allCourses[courseId]
    const increasedCredit = cloneDeep(BASE_CREDIT)
    set(increasedCredit, `${courseData.course_type}`, +courseData.credit.slice(0, 1))

    if (isEnoughCredit(usedCredit, increasedCredit, MAXIMUM_CREDIT)) {
      setUsedCredit(addCredit(usedCredit, increasedCredit))
      dispatch({ type: ActionType.Add, courseId })
    }
  }
  const deleteCourse = (courseId: CourseId) => {
    const courseData = state.allCourses[courseId]
    const decreasedCredit = cloneDeep(BASE_CREDIT)
    set(decreasedCredit, `${courseData.course_type}`, +courseData.credit.slice(0, 1))

    setUsedCredit(subCredit(usedCredit, decreasedCredit))
    dispatch({ type: ActionType.Delete, courseId })

    // * For log
  }

  const setSection = (courseId: CourseId, section: Section, sectionType: SectionType) =>
    dispatch({ type: ActionType.SetSection, courseId, section, sectionType })

  // * For log
  // useEffect(() => {
  //   console.log('StoreContext', state.selectedCourses, state.unselectedCourses, state.externalUnselectedCourses)
  // }, [state])

  // * for log
  // useEffect(() => console.log('credit', usedCredit), [usedCredit])

  // TODO : implement this
  const handleSendTranscript = async (files: File[]) => {
    // const transcriptData = await transcriptService.sendTranscript(files)

    // if (!transcriptData) return

    // const _classYear = getClassYearFromStudentId(transcriptData.student_id)

    // * ===== mock ===== *
    const _classYear = getClassYearFromStudentId('620101010')
    //* ================= *
    setClassYear(_classYear)

    // initAllCredit(transcriptData.credit_counter)
    // * ===== mock ===== *
    initAllCredit(BASE_CREDIT)
    //* ================= *
  }

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
    activeStep,
    setActiveStep,
    classYear,
    setClassYear,
    initExternalCourse,
    addCourse,
    deleteCourse,
    setSection,
    handleSendTranscript,
    initAllCredit,
    usedCredit,
    setUsedCredit,
    ...state,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}
