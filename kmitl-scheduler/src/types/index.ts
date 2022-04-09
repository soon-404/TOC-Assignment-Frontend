export * from 'types/dropzone'

export type Pee = '1' | '2' | '3' | '4' | null

export type Section = {
  id: string
  building?: string
  room?: string
  schedule: string[]
  type: string
}

export type DateRange = {
  start: string
  end: string
}

export type Subject = {
  id: string
  course_type: string
  name: string
}

export type Course = {
  id: string
  name: string
  class_year: string
  course_type: string
  credit: string
  midterm?: string | DateRange
  final?: string | DateRange
  note?: string
  restriction?: string[]
  section: Section[]
  semester: string
  teacher: string[]
  year: string
}

export type CollageCredit = {
  ภาค: number
  ภาษา: number
  มนุษย์: number
  วิทย์: number
  สังคม: number
  เสรี: number
}

export interface ApiData {
  name: string
  student_id: string
  course_recommends: Course[]
  credit_counter: CollageCredit
  credit_recommends: CollageCredit
  subjects: Subject[][]
}
