import { DateRange } from 'types'

export const isDateRange = (x: any): x is DateRange => {
  return typeof x?.start === 'number' && typeof x?.end === 'number'
}
