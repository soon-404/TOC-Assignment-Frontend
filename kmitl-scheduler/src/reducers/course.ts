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
} from 'types'

export enum ActionType {
  Add = 'add course',
  Delete = 'delete course',
  Init = 'init all courses',
  SetSection = 'set section',
}

export type State = {
  allCourses: CourseTables
  unselectedCourses: Record<CourseType, CourseId[]>
  selectedCourses: Record<CourseType, CourseId[]>
  sectionMapping: SectionMapping
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

export type Action = AddAction | DeleteAction | InitAction | SetSectionAction

export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case ActionType.Add: {
      const { courseId } = action
      const courseType = getCourseType(state.allCourses[courseId])
      if (isValidToAdd(courseId, state.unselectedCourses[courseType], state.selectedCourses[courseType])) {
        const tempState = cloneDeep(state)
        set(
          tempState,
          `unselectedCourses[${courseType}]`,
          state.unselectedCourses[courseType].filter((_courseId) => _courseId !== courseId),
        )
        set(tempState, `selectedCourses[${courseType}]`, concat(state.selectedCourses[courseType], courseId))
        return tempState
      }
      return state
    }

    case ActionType.Delete: {
      const { courseId } = action
      const courseType = getCourseType(state.allCourses[courseId])
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
      const suggestMainCourses: CourseId[] = []
      const suggestOptionCourses: CourseId[] = []

      for (const course of action.courses) {
        if (!Object.keys(allCourses).includes(course.id)) {
          allCourses[course.id] = course as CourseField
          sectionMapping[course.id] = {
            [SectionType.Practice]: course.section.find((section) => section?.type === SectionType.Practice),
            [SectionType.Theory]: course.section.find((section) => section?.type === SectionType.Theory),
          }

          if (isMainCourse(course)) {
            suggestMainCourses.push(course.id)
          } else {
            suggestOptionCourses.push(course.id)
          }
        }
      }

      return {
        ...state,
        allCourses,
        sectionMapping,
        unselectedCourses: { main: suggestMainCourses, option: suggestOptionCourses },
      }
    }

    case ActionType.SetSection: {
      const { courseId, section, sectionType } = action
      const tempState = cloneDeep(state)
      set(tempState, `sectionMapping[${courseId}][${sectionType}]`, section)
      return tempState
    }
  }
}

export const initialState: State = {
  allCourses: {},
  sectionMapping: {},
  selectedCourses: { main: [], option: [] },
  unselectedCourses: { main: [], option: [] },
}
