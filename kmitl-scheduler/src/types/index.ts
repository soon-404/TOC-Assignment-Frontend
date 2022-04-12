export * from 'types/dropzone'

export type Pee = '1' | '2' | '3' | '4' | ''

type Semester = '1' | '2'
type SubjectType = 'ทฤษฎี' | 'ปฏิบัติ'

export interface SubjectBlock {
  id: string
  start: string
  end: string
  color: string
  building: string
  classYear: string
  courseId: string
  courseName: string
  credit: string
  final: {
    end: string
    start: string
  }
  midterm: string
  note: string
  restriction: string[]
  room: string
  schedule: string[]
  section: string[]
  teacher: string[]
  type: string
}
