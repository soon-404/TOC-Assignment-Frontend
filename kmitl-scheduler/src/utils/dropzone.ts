import { Icoords, IDomRect } from 'types'

export const isCoordsInDropBoundaries = (draggableCoords: Icoords, dropZonesDOMRect: IDomRect) => {
  const isDraggedXInRange = dropZonesDOMRect.left <= draggableCoords.x && draggableCoords.x <= dropZonesDOMRect.right
  const isDraggedYInRange = dropZonesDOMRect.top <= draggableCoords.y && draggableCoords.y <= dropZonesDOMRect.bottom

  return isDraggedXInRange && isDraggedYInRange
}
