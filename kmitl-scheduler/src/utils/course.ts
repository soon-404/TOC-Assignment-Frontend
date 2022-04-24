import { flattenDeep, compact } from 'lodash'
import moment from 'moment'
import { Course, CourseField, CourseId, CourseTables, CourseType, EventToCalendar, SectionMapping } from 'types'
import { isDateRange } from 'types/guard'

export const isMainCourse = (course: Course | CourseField): boolean =>
  ['department', 'specific_department'].includes(course.course_type)

export const getCourseType = (course: Course | CourseField): CourseType =>
  isMainCourse(course) ? CourseType.Main : CourseType.Option

export const isCourseSelected = (courseId: CourseId, selectedCourses: CourseId[]): boolean =>
  !!selectedCourses.find((_courseId) => _courseId === courseId)

export const isValidToAdd = (
  courseId: CourseId,
  unselectedCourses: CourseId[],
  selectedCourses: CourseId[],
): boolean => {
  return (
    !!unselectedCourses.find((_courseId) => _courseId === courseId) &&
    !selectedCourses.find((_courseId) => _courseId === courseId)
  )
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
