import { useEffect, useRef } from 'react'
import { Paper, styled } from '@mui/material'
import { PanInfo } from 'framer-motion'

import { useStore, useDialog } from 'hooks/useStore'
import { Block } from 'components/Block'
import { BlockDetailDialog } from 'components/Dialog/BlockDetailDialog'
import { isCoordsInDropBoundaries } from 'utils/dropzone'
import { CourseWithSection, DomRect } from 'types'

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
  courses?: CourseWithSection[]
  dropZonesDomRects: DomRect | null
  setDropZonesDomRects: (dropZonesDomRects: DomRect) => void
}

export const DropZone: React.FC<IDropZone> = ({ color, courses = [], dropZonesDomRects, setDropZonesDomRects }) => {
  const { open } = useDialog()
  const { freeCourses, selectedCourses, setFreeCourses, setSelectedCourses } = useStore()

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
  }, [zoneRef, freeCourses, selectedCourses])

  const isCoordsInBox = ({ point }: PanInfo): boolean => {
    if (!dropZonesDomRects) return true
    return isCoordsInDropBoundaries(point, dropZonesDomRects)
  }

  const handleOnDragEnd = (courseWithSection: CourseWithSection, { point }: PanInfo) => {
    if (!dropZonesDomRects) return
    if (!isCoordsInDropBoundaries(point, dropZonesDomRects)) {
      const leftedBlocks = selectedCourses.filter(
        (selectedCourse) => selectedCourse.course.id !== courseWithSection.course.id,
      )
      setSelectedCourses([...leftedBlocks])
      setFreeCourses((prev) => [...prev, courseWithSection])
    }
  }

  return (
    <Root ref={zoneRef}>
      {courses.map((courseWithSection, idx) => (
        <Block
          key={`DropZone-${courseWithSection.course.id}-${idx}`}
          color={color}
          label={courseWithSection.course.name}
          isCoordsInBox={isCoordsInBox}
          onDoubleClick={() => open(<BlockDetailDialog courseId={courseWithSection.course.id} from="dropzone" />)}
          onDragEnd={(_, info) => handleOnDragEnd(courseWithSection, info)}
        />
      ))}
    </Root>
  )
}
