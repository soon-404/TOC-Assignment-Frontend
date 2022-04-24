import { Moment } from 'moment'

export type ClassYear = '1' | '2' | '3' | '4'

export enum SectionType {
  Theory = 'ทฤษฎี',
  Practice = 'ปฏิบัติ',
}

export type CourseCategory = 'department' | 'specific_department' | 'language' | 'human' | 'social' | 'sciMath' | 'free'

export type Credit = Partial<{ [courseCategory in CourseCategory]: number }>

export type DateRange = {
  start: number
  end: number
}

export type Section = {
  id: string
  building?: string
  room?: string
  schedule: DateRange[]
  type?: SectionType
}

export type Course = {
  id: string
  name: string
  class_year: ClassYear
  course_type: CourseCategory
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

export type Subject = {
  id: string
  name: string
  course_type: CourseCategory
}

export interface TranscriptData {
  name: string
  student_id: string
  course_recommends: Course[]
  credit_counter: Credit
  subjects: Subject[][]
}

export interface ApiTranscriptData {
  data: TranscriptData
  success: boolean
}

export interface ApiTablesData {
  data: Course[]
  success: boolean
}

export interface DomRect {
  top: number
  left: number
  right: number
  bottom: number
}

export type EventToCalendar = {
  title?: string
  start: Moment
  end: Moment
  color: string
}

export type CourseId = Course['id']
export type CourseField = Omit<Course, 'id'>
export type CourseTables = Record<CourseId, CourseField>

export enum CourseType {
  Main = 'main',
  Option = 'option',
}

export type SectionMapping = Record<CourseId, Partial<Record<SectionType, Section>>>

export type RecommandedMapping = Partial<Record<CourseId, boolean>> // <CourseId, isRecommandedCourse>
