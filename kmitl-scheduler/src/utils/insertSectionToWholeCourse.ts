import { CourseWithSection, Section, SectionType } from 'types'
import { cloneDeep } from 'lodash'

export const insertSectionToWholeCourse = (
  index: number,
  section: Section,
  prev: CourseWithSection[],
  type: SectionType,
): CourseWithSection[] => {
  const newValue = type === SectionType.Practice ? { sectionPractice: section } : { sectionTheory: section }
  const newArr = cloneDeep(prev)
  newArr[index] = { ...prev[index], ...newValue }

  return newArr
}
