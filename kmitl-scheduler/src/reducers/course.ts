import { Reducer } from 'react'
import { concat, set } from 'lodash'
import { getCourseType, isValidToAdd, isValidToDelete } from 'utils/course'
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
        // TODO : use lodash set
        return {
          ...state,
          unselectedCourses: {
            ...state.unselectedCourses,
            [courseType]: state.unselectedCourses[courseType].filter((_courseId) => _courseId !== courseId),
          },
          selectedCourses: {
            ...state.selectedCourses,
            [courseType]: concat(state.selectedCourses[courseType], courseId),
          },
        }
      }
      return state
    }
    case ActionType.Delete: {
      const { courseId } = action
      const courseType = getCourseType(state.allCourses[courseId])
      if (isValidToDelete(courseId, state.unselectedCourses[courseType], state.selectedCourses[courseType])) {
        // TODO : use lodash set
        return {
          ...state,
          unselectedCourses: {
            ...state.unselectedCourses,
            [courseType]: concat(state.unselectedCourses[courseType], courseId),
          },
          selectedCourses: {
            ...state.selectedCourses,
            [courseType]: state.selectedCourses[courseType].filter((_courseId) => _courseId !== courseId),
          },
        }
      }
      return state
    }
    case ActionType.Init: {
      const allCourses: CourseTables = {}
      const sectionMapping: SectionMapping = {}
      for (const course of action.courses) {
        if (!Object.keys(allCourses).includes(course.id)) {
          allCourses[course.id] = course as CourseField
          sectionMapping[course.id] = {
            [SectionType.Practice]: course.section.find((section) => section?.type === SectionType.Practice),
            [SectionType.Theory]: course.section.find((section) => section?.type === SectionType.Theory),
          }
        }
      }

      const suggestMainCourses: CourseId[] = Object.keys(allCourses)
        .filter(
          (courseId) =>
            allCourses[courseId].class_year === action.classYear && allCourses[courseId].course_type === 'department',
        )
        .map((courseId) => courseId)

      const suggestOptionCourses: CourseId[] = Object.keys(allCourses)
        .filter(
          (courseId) =>
            allCourses[courseId].class_year === action.classYear && allCourses[courseId].course_type !== 'department',
        )
        .map((courseId) => courseId)

      return {
        ...state,
        allCourses,
        sectionMapping,
        unselectedCourses: { main: suggestMainCourses, option: suggestOptionCourses },
      }
    }
    case ActionType.SetSection: {
      const { courseId, section, sectionType } = action
      set(state, `sectionMappin[${courseId}][${sectionType}]`, section)
      return { ...state }
    }
  }
}

export const initialState: State = {
  allCourses: {},
  sectionMapping: {},
  selectedCourses: { main: [], option: [] },
  unselectedCourses: { main: [], option: [] },
}
