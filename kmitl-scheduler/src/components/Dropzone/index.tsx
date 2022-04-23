import { useEffect, useRef } from 'react'
import { Paper, styled } from '@mui/material'
import { PanInfo } from 'framer-motion'

import { useStore, useDialog } from 'hooks/useStore'
import { Block } from 'components/Block'
import { BlockDetailDialog } from 'components/Dialog/BlockDetailDialog'
import { isCoordsInDropBoundaries } from 'utils/dropzone'
import { CourseId, CourseType, DomRect } from 'types'

const Root = styled(Paper)(() => ({
  gap: 16,
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  minHeight: 148, // * block height(100) + padding(48)
}))

interface IDropZone {
  color: string
  dropZonesDomRects: DomRect | null
  setDropZonesDomRects: (dropZonesDomRects: DomRect) => void
  courseType: CourseType
}

export const DropZone = ({ color, dropZonesDomRects, setDropZonesDomRects, courseType }: IDropZone) => {
  const { open } = useDialog()
  const { allCourses, deleteCourse, selectedCourses } = useStore()

  const zoneRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const resizeHandler = () => {
      const zoneRefEl = zoneRef.current
      if (!zoneRefEl) return
      setDropZonesDomRects({
        top: zoneRefEl.getBoundingClientRect().top + window.scrollY,
        left: zoneRefEl.getBoundingClientRect().left,
        right: zoneRefEl.getBoundingClientRect().right,
        bottom: zoneRefEl.getBoundingClientRect().bottom + window.scrollY,
      })
    }

    resizeHandler()

    window.addEventListener('resize', resizeHandler)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [zoneRef, selectedCourses])

  const isCoordsInBox = ({ point }: PanInfo): boolean => {
    if (!dropZonesDomRects) return true
    return isCoordsInDropBoundaries(point, dropZonesDomRects)
  }

  const handleOnDragEnd = (courseId: CourseId, { point }: PanInfo) => {
    if (!dropZonesDomRects) return
    if (!isCoordsInDropBoundaries(point, dropZonesDomRects)) {
      deleteCourse(courseId)
    }
  }

  return (
    <Root ref={zoneRef}>
      {selectedCourses[courseType].map((courseId) => (
        <Block
          key={`DropZone-${courseId}`}
          color={color}
          label={allCourses[courseId].name}
          isCoordsInBox={isCoordsInBox}
          onDoubleClick={() => open(<BlockDetailDialog courseId={courseId} courseType={courseType} />)}
          onDragEnd={(_, info) => handleOnDragEnd(courseId, info)}
        />
      ))}
    </Root>
  )
}
