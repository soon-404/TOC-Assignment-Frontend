import { useEffect, useRef } from 'react'
import { Paper, styled } from '@mui/material'
import { PanInfo } from 'framer-motion'

import { useStore } from 'hooks/useStore'
import { Block } from 'components/Block'
import { isCoordsInDropBoundaries } from 'utils/dropzone'
import { Course, IDomRect } from 'types'

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
  courses?: Course[]
  dropZonesDomRects: IDomRect | null
  setDropZonesDomRects: (dropZonesDomRects: IDomRect) => void
}

export const DropZone: React.FC<IDropZone> = ({ color, courses = [], dropZonesDomRects, setDropZonesDomRects }) => {
  const { selectedCourses, setFreeCourses, setSelectedCourses } = useStore()

  const zoneRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const resizeHandler = () => {
      const zoneRefEl = zoneRef.current
      if (!zoneRefEl) return
      setDropZonesDomRects({
        top: zoneRefEl.getBoundingClientRect().top + window.scrollY,
        left: zoneRefEl.getBoundingClientRect().left,
        right: zoneRefEl.getBoundingClientRect().right,
        bottom: zoneRefEl.getBoundingClientRect().bottom,
      })
    }

    resizeHandler()

    window.addEventListener('resize', resizeHandler)
    return () => window.removeEventListener('resize', resizeHandler)
  }, [zoneRef])

  const isCoordsInBox = (info: PanInfo): boolean => {
    if (!dropZonesDomRects) return true
    return isCoordsInDropBoundaries({ x: info.point.x, y: info.point.y }, dropZonesDomRects)
  }

  const handleOnDragEnd = (course: Course, info: PanInfo) => {
    if (!dropZonesDomRects) return
    if (!isCoordsInDropBoundaries({ x: info.point.x, y: info.point.y }, dropZonesDomRects)) {
      const leftedBlocks = selectedCourses.filter((selectedCourse) => selectedCourse.id !== course.id)
      setSelectedCourses([...leftedBlocks])
      setFreeCourses((prev) => [...prev, course])
    }
  }

  return (
    <Root ref={zoneRef}>
      {courses.map((course) => (
        <Block
          key={course.id}
          color={color}
          label={course.name}
          isCoordsInBox={isCoordsInBox}
          onDragEnd={(_, info) => handleOnDragEnd(course, info)}
        />
      ))}
    </Root>
  )
}
