import { flattenDeep, compact } from 'lodash'
import moment from 'moment'
import { mainCourseCategory } from 'constants'
import {
  Course,
  CourseCategoryFilter,
  CourseField,
  CourseId,
  CourseTables,
  CourseType,
  EventToCalendar,
  SectionMapping,
  isDateRange,
  CourseCategory,
} from 'types'

export const isMainCourse = (course: Course | CourseField | string): boolean => {
  if (typeof course === 'string') return (mainCourseCategory as string[]).includes(course)
  return (mainCourseCategory as CourseCategory[]).includes(course.course_type)
}

export const getCourseType = (course: Course | CourseField): CourseType =>
  isMainCourse(course) ? CourseType.Main : CourseType.Option

export const isCourseSelected = (courseId: CourseId, selectedCourses: CourseId[]): boolean =>
  !!selectedCourses.find((_courseId) => _courseId === courseId)

export const isValidToAdd = (courseId: CourseId, selectedCourses: CourseId[]): boolean => {
  return !selectedCourses.find((_courseId) => _courseId === courseId)
}

export const isValidToDelete = (
  courseId: CourseId,
  unselectedCourses: CourseId[],
  selectedCourses: CourseId[],
): boolean => {
  return (
    !unselectedCourses.find((_courseId) => _courseId === courseId) &&
    !!selectedCourses.find((_courseId) => _courseId === courseId)
  )
}

export const getAllSchedules = (
  allCourses: CourseTables,
  selectedCourses: Record<CourseType, CourseId[]>,
  sectionMapping: SectionMapping,
): EventToCalendar[] =>
  compact(
    flattenDeep(
      Object.values(selectedCourses).map((coursesId) =>
        coursesId
          .filter((courseId) => !!allCourses[courseId].section.length)
          .map((courseId) => {
            const { midterm, final, name } = allCourses[courseId]
            return [
              Object.values(sectionMapping[courseId]).map(
                (section) =>
                  section?.schedule.map<EventToCalendar>(({ start, end }) => ({
                    title: name,
                    start: moment.unix(start),
                    end: moment.unix(end),
                    color: '#f107a3',
                  })) ?? null,
              ),
              isDateRange(midterm)
                ? {
                    title: name,
                    start: moment.unix(midterm.start),
                    end: moment.unix(midterm.end),
                    color: '#f1b307',
                  }
                : null,
              isDateRange(final)
                ? {
                    title: name,
                    start: moment.unix(final.start),
                    end: moment.unix(final.end),
                    color: '#f1b307',
                  }
                : null,
            ]
          }),
      ),
    ),
  )

export const getStudySchedules = (
  allCourses: CourseTables,
  selectedCourses: Record<CourseType, CourseId[]>,
  sectionMapping: SectionMapping,
): EventToCalendar[] =>
  compact(
    flattenDeep(
      Object.values(selectedCourses).map((coursesId) =>
        coursesId
          .filter((courseId) => !!allCourses[courseId].section.length)
          .map((courseId) =>
            Object.values(sectionMapping[courseId]).map(
              (section) =>
                section?.schedule.map<EventToCalendar>(({ start, end }) => ({
                  title: allCourses[courseId].name,
                  start: moment.unix(start),
                  end: moment.unix(end),
                  color: '#f107a3',
                })) ?? null,
            ),
          ),
      ),
    ),
  )

export const getMidtermSchedules = (
  allCourses: CourseTables,
  selectedCourses: Record<CourseType, CourseId[]>,
): EventToCalendar[] =>
  compact(
    flattenDeep(
      Object.values(selectedCourses).map((coursesId) =>
        coursesId
          .filter((courseId) => !!allCourses[courseId].section.length)
          .map((courseId) => {
            const { midterm, name } = allCourses[courseId]
            return [
              isDateRange(midterm)
                ? {
                    title: name,
                    start: moment.unix(midterm.start),
                    end: moment.unix(midterm.end),
                    color: '#f1b307',
                  }
                : null,
            ]
          }),
      ),
    ),
  )

export const getFinalSchedules = (
  allCourses: CourseTables,
  selectedCourses: Record<CourseType, CourseId[]>,
): EventToCalendar[] =>
  compact(
    flattenDeep(
      Object.values(selectedCourses).map((coursesId) =>
        coursesId
          .filter((courseId) => !!allCourses[courseId].section.length)
          .map((courseId) => {
            const { final, name } = allCourses[courseId]
            return [
              isDateRange(final)
                ? {
                    title: name,
                    start: moment.unix(final.start),
                    end: moment.unix(final.end),
                    color: '#f1b307',
                  }
                : null,
            ]
          }),
      ),
    ),
  )

export const filterByCoursesCategory = (
  coursesId: CourseId[],
  allCourses: CourseTables,
  courseCategory: CourseCategoryFilter,
): CourseId[] => {
  const bools = Object.values(courseCategory)
  if (!bools.some((bool) => bool) || bools.every((bool) => bool)) {
    return coursesId
  }

  return coursesId.filter((courseId) => !!allCourses?.[courseId] && courseCategory[allCourses[courseId].course_type])
}
