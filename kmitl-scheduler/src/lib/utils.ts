export interface Icoords {
  x: number
  y: number
}

export interface IdragUpdate {
  action: 'onDrag' | 'onDragEnd'
  draggableCoords: Icoords
  inComingBlock: SubjectBlock
}

export interface SubjectBlock {
  id: string
  name: string
  x: number
  y: number
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

export const numberBetween = (x: number, min: number, max: number) => {
  return x >= min && x <= max
}

export const isCoordsInDropBoundaries = (draggableCoords: Icoords, dropZonesDOMRect: IDomRect) => {
  const isDraggedXInRange = numberBetween(draggableCoords.x, dropZonesDOMRect.left, dropZonesDOMRect.right)

  const isDraggedYInRange = numberBetween(draggableCoords.y, dropZonesDOMRect.top, dropZonesDOMRect.bottom)

  return isDraggedXInRange && isDraggedYInRange
}
