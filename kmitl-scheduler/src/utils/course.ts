import { Course, CourseField, CourseId, CourseType } from 'types'

export const getCourseType = (course: Course | CourseField): CourseType => {
  if (course.course_type === 'department') {
    return CourseType.Main
  }
  return CourseType.Option
}

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

