import { DateRange, RequiredCredit } from 'types'

export const isDateRange = (x: any): x is DateRange => {
  return typeof x?.start === 'number' && typeof x?.end === 'number'
}

export const isRequiredCredit = (x: any): x is RequiredCredit => {
  return (
    typeof x?.specific_department === 'number' &&
    typeof x?.department === 'number' &&
    typeof x?.language === 'number' &&
    typeof x?.sciMath === 'number' &&
    typeof x?.social === 'number' &&
    typeof x?.human === 'number' &&
    typeof x?.free === 'number'
  )
}
