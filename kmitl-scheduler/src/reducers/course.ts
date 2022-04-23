import { Reducer } from 'react'
import { concat } from 'lodash'
import { getCourseType, isValidToAdd, isValidToDelete } from 'utils/course'
import { Course, CourseTables, SectionMapping, CourseId, CourseType, CourseField, SectionType } from 'types'

export enum ActionType {
  Add = 'add course',
  Delete = 'delete course',
  Init = 'init all courses',
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
  courses: Course[]
}

export type Action = AddAction | DeleteAction | InitAction

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
            sectionPractice: course.section.find((section) => section?.type === SectionType.Practice),
            sectionTheory: course.section.find((section) => section?.type === SectionType.Theory),
          }
        }
      }

      return { ...state, allCourses }
    }
  }
}
