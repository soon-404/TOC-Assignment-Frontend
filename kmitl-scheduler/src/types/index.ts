export * from 'types/dropzone'

export type Pee = '1' | '2' | '3' | '4' | ''

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
  restriction: Array<string | undefined>
  room: string
  schedule: string[]
  section: string[]
  teacher: string[]
  type: string
}
