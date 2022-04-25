import { RequiredCredit } from 'types'
import { tuple } from 'utils/tuple'

export const apiUrl = 'https://toc.exitguy.studio/api/v1/'

export const mainCourseCategory = tuple('department', 'specific_department')
export const optionCourseCategory = tuple('language', 'human', 'social', 'sciMath', 'free')

export const MAXIMUM_CREDIT: Readonly<RequiredCredit> = {
  department: 89,
  specific_department: 9,
  free: 6,
  human: 6,
  language: 12,
  sciMath: 6,
  social: 6,
}

export const BASE_CREDIT: Readonly<RequiredCredit> = {
  department: 0,
  specific_department: 0,
  free: 0,
  human: 0,
  language: 0,
  sciMath: 0,
  social: 0,
}
