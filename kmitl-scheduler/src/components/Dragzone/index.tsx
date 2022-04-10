import { PanInfo } from 'framer-motion'
import { styled, Paper } from '@mui/material'

import { Block } from 'components/Block'
import { BlockDetailDialog } from 'components/Dialog/BlockDetailDialog'
import { useDialog, useStore } from 'hooks/useStore'
import { isCoordsInDropBoundaries } from 'utils/dropzone'
import { Course, DomRect } from 'types'

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

interface DragZoneProps {
  color: string
  courses?: Course[]
  dropZonesDomRects: DomRect | null
}

export const DragZone = ({ color, courses = [], dropZonesDomRects }: DragZoneProps) => {
  const { open } = useDialog()
  const { freeCourses, setFreeCourses, setSelectedCourses } = useStore()

  const handleOnDragEnd = (course: Course, info: PanInfo) => {
    if (!dropZonesDomRects) return
    if (isCoordsInDropBoundaries({ x: info.point.x, y: info.point.y }, dropZonesDomRects)) {
      const leftedBlocks = freeCourses.filter((freeCourse) => freeCourse.id !== course.id)
      setFreeCourses([...leftedBlocks])
      setSelectedCourses((prev) => [...prev, course])
    }
  }

  return (
    <Root>
      {courses.map((course) => (
        <Block
          key={course.id}
          color={color}
          label={course.name}
          onDoubleClick={() => open(<BlockDetailDialog course={course} />)}
          onDragEnd={(_, info) => handleOnDragEnd(course, info)}
        />
      ))}
    </Root>
  )
}
