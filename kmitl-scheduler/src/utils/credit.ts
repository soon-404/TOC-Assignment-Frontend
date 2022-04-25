import { BASE_CREDIT, MAXIMUM_CREDIT } from 'constants'
import { clone, cloneDeep } from 'lodash'
import { CourseCategory, RequiredCredit } from 'types'

export const isEnoughCredit = (
  usedCredit: RequiredCredit,
  additional: RequiredCredit,
  maximumCredit: RequiredCredit,
): boolean => {
  return Object.keys(usedCredit).every((category) => {
    const categoryKey = category as CourseCategory
    return usedCredit[categoryKey] + additional[categoryKey] <= maximumCredit[categoryKey]
  })
}

export const addCredit = (usedCredit: RequiredCredit, additional: RequiredCredit): RequiredCredit => {
  const credit: RequiredCredit = cloneDeep(BASE_CREDIT)
  for (const category of Object.keys(usedCredit)) {
    const categoryKey = category as CourseCategory
    credit[categoryKey] = usedCredit[categoryKey] + additional[categoryKey]
  }

  return credit
}

export const subCredit = (usedCredit: RequiredCredit, reduced: RequiredCredit): RequiredCredit => {
  const credit: RequiredCredit = cloneDeep(BASE_CREDIT)
  for (const category of Object.keys(usedCredit)) {
    const categoryKey = category as CourseCategory
    const newCredit = usedCredit[categoryKey] - reduced[categoryKey]
    if (newCredit < 0) {
      throw new Error('invert credit value')
    }

    credit[categoryKey] = newCredit
  }

  return credit
}

export const getRemainingCredit = (usedCredit: RequiredCredit): RequiredCredit => {
  return subCredit(MAXIMUM_CREDIT, usedCredit)
}
