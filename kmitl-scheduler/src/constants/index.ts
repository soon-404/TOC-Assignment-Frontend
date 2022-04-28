import { CourseCategory, RequiredCredit } from 'types'
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

export const categoryMapping: Record<CourseCategory, string> = {
  department: '1. วิชาเฉพาะภาควิชา ',
  specific_department: '2. วิชาเลือกเฉพาะภาค ',
  sciMath: '3. วิชาเลือกหมวดวิทยาศาสตร์กับคณิตศาสตร์ ',
  language: '4. วิชาเลือกหมวดภาษา ',
  human: '5. วิชาเลือกหมวดมนุษยศาสตร์ ',
  social: '6.วิชาเลือกหมวดสังคมศาสตร',
  free: '7. วิชาเลือกเสรี',
}


export const uploadingCategoryMapping: Record<CourseCategory, string> = {
  department: 'วิชาเฉพาะภาควิชา ',
  specific_department: 'วิชาเลือกเฉพาะภาค ',
  sciMath: 'วิชาเลือกหมวดวิทยาศาสตร์กับคณิตศาสตร์ ',
  language: 'วิชาเลือกหมวดภาษา ',
  human: 'วิชาเลือกหมวดมนุษยศาสตร์ ',
  social: 'วิชาเลือกหมวดสังคมศาสตร',
  free: 'วิชาเลือกเสรี',
}
