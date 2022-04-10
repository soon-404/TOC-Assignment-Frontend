import { Course } from 'types'

export interface Icoords {
  x: number
  y: number
}

export interface IdragUpdate {
  action: 'onDrag' | 'onDragEnd'
  draggableCoords: Icoords
  inComingBlock: Course
}

export interface IisHoverItsDropzone {
  id: string | null
  status: boolean
}

export interface IDomRect {
  top: number
  left: number
  right: number
  bottom: number
}
