import { Reducer } from 'react'
import { cloneDeep, concat, set } from 'lodash'
import { getCourseType, isMainCourse, isValidToAdd, isValidToDelete } from 'utils/course'
import {
  Course,
  CourseTables,
  SectionMapping,
  CourseId,
  CourseType,
  CourseField,
  SectionType,
  Section,
  ClassYear,
  RecommandedMapping,
} from 'types'

export enum ActionType {
  Add = 'add course',
  Delete = 'delete course',
  Init = 'init all courses',
  SetSection = 'set section',
  InitExternal = 'init external courses',
}

export type State = {
  allCourses: CourseTables
  selectedCourses: Record<CourseType, CourseId[]>
  unselectedCourses: Record<CourseType, CourseId[]>
  externalUnselectedCourses: Record<CourseType, CourseId[]>
  sectionMapping: SectionMapping
  isRecommandedMapping: RecommandedMapping
}

type AddAction = {
  type: ActionType.Add
  courseId: CourseId
}

type DeleteAction = {
  type: ActionType.Delete
  courseId: CourseId
}

type InitAction = {
  type: ActionType.Init
  classYear: ClassYear
  courses: Course[]
}

type SetSectionAction = {
  type: ActionType.SetSection
  courseId: CourseId
  section: Section
  sectionType: SectionType
}

type InitExternalAction = {
  type: ActionType.InitExternal
  courses: Course[]
}

export type Action = AddAction | DeleteAction | InitAction | SetSectionAction | InitExternalAction

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.Add: {
      const { courseId } = action

      if (!state.allCourses?.[courseId]) {
        return state
      }

      const courseType = getCourseType(state.allCourses[courseId])

      // * For log
      // console.log('isValidToAdd', isValidToAdd(courseId, state.selectedCourses[courseType]))

      if (isValidToAdd(courseId, state.selectedCourses[courseType])) {
        const tempState = cloneDeep(state)
        set(
          tempState,
          `unselectedCourses[${courseType}]`,
          state.unselectedCourses[courseType].filter((_courseId) => _courseId !== courseId),
        )
        set(
          tempState,
          `externalUnselectedCourses[${courseType}]`,
          state.externalUnselectedCourses[courseType].filter((_courseId) => _courseId !== courseId),
        )
        set(tempState, `selectedCourses[${courseType}]`, concat(state.selectedCourses[courseType], courseId))
        return tempState
      }
      return state
    }

    case ActionType.Delete: {
      const { courseId } = action

      if (!state.allCourses?.[courseId]) {
        return state
      }

      const courseType = getCourseType(state.allCourses[courseId])

      if (!state.isRecommandedMapping?.[courseId]) {
        const tempState = cloneDeep(state)
        set(
          tempState,
          `selectedCourses[${courseType}]`,
          state.selectedCourses[courseType].filter((_courseId) => _courseId !== courseId),
        )
        return tempState
      }

      if (isValidToDelete(courseId, state.unselectedCourses[courseType], state.selectedCourses[courseType])) {
        const tempState = cloneDeep(state)
        set(tempState, `unselectedCourses[${courseType}]`, concat(state.unselectedCourses[courseType], courseId))
        set(
          tempState,
          `selectedCourses[${courseType}]`,
          state.selectedCourses[courseType].filter((_courseId) => _courseId !== courseId),
        )
        return tempState
      }
      return state
    }

    case ActionType.Init: {
      const allCourses: CourseTables = {}
      const sectionMapping: SectionMapping = {}
      const isRecommandedMapping: RecommandedMapping = {}
      const suggestMainCourses: CourseId[] = []
      const suggestOptionCourses: CourseId[] = []

      for (const course of action.courses) {
        if (!Object.keys(allCourses).includes(course.id)) {
          allCourses[course.id] = course as CourseField
          isRecommandedMapping[course.id] = true
          sectionMapping[course.id] = {
            [SectionType.Practice]: course.section.find((section) => section?.type === SectionType.Practice),
            [SectionType.Theory]: course.section.find((section) => section?.type === SectionType.Theory),
          }
        }

        if (isMainCourse(course)) {
          suggestMainCourses.push(course.id)
        } else {
          suggestOptionCourses.push(course.id)
        }
      }

      return {
        ...state,
        allCourses,
        sectionMapping,
        isRecommandedMapping,
        unselectedCourses: { main: suggestMainCourses, option: suggestOptionCourses },
      }
    }

    case ActionType.SetSection: {
      const { courseId, section, sectionType } = action
      const tempState = cloneDeep(state)
      set(tempState, `sectionMapping[${courseId}][${sectionType}]`, section)
      return tempState
    }

    case ActionType.InitExternal: {
      const externalMainCourses: CourseId[] = []
      const externalOptionCourses: CourseId[] = []
      const tempState = cloneDeep(state)
      for (const course of action.courses) {
        if (!Object.keys(state.allCourses).includes(course.id)) {
          set(tempState, `allCourses[${course.id}]`, course as CourseField)
          tempState.sectionMapping[course.id] = {
            [SectionType.Practice]: course.section.find((section) => section?.type === SectionType.Practice),
            [SectionType.Theory]: course.section.find((section) => section?.type === SectionType.Theory),
          }
        }

        if (state.selectedCourses.main.includes(course.id) || state.selectedCourses.option.includes(course.id)) {
          continue
        }

        if (isMainCourse(course)) {
          externalMainCourses.push(course.id)
        } else {
          externalOptionCourses.push(course.id)
        }
      }

      return {
        ...tempState,
        externalUnselectedCourses: { main: externalMainCourses, option: externalOptionCourses },
      }
    }
  }
}

export const initialState: State = {
  allCourses: {},
  sectionMapping: {},
  isRecommandedMapping: {},
  selectedCourses: { main: [], option: [] },
  unselectedCourses: { main: [], option: [] },
  externalUnselectedCourses: { main: [], option: [] },
}
