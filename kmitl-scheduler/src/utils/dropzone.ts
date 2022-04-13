import { Point } from 'framer-motion'
import { DomRect } from 'types'

export const isCoordsInDropBoundaries = (draggableCoords: Point, dropZonesDOMRect: DomRect) => {
  const isDraggedXInRange = dropZonesDOMRect.left <= draggableCoords.x && draggableCoords.x <= dropZonesDOMRect.right
  const isDraggedYInRange = dropZonesDOMRect.top <= draggableCoords.y && draggableCoords.y <= dropZonesDOMRect.bottom

  return isDraggedXInRange && isDraggedYInRange
}
