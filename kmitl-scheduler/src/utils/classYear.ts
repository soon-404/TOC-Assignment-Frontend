import { ClassYear } from 'types'

const BIAS = 65 // * now + 1

export const getClassYearFromStudentId = (studentId: string): ClassYear | null => {
  const studentYear = parseInt(studentId.slice(0, 2))
  if (BIAS - studentYear <= 0) return null

  return (BIAS - studentYear).toFixed(0) as ClassYear
}
