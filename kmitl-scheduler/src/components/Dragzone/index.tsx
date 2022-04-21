import { PanInfo } from 'framer-motion'
import { styled, Paper } from '@mui/material'

import { Block } from 'components/Block'
import { BlockDetailDialog } from 'components/Dialog/BlockDetailDialog'
import { useDialog, useStore } from 'hooks/useStore'
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

  // * In case want to overflow-y-scroll
  // maxHeight: '400px',
  // overflowY: 'scroll',
  // scrollbarWidth: 'none',
  // '&::-webkit-scrollbar': {
  //   display: 'none',
  // },
}))

interface DragZoneProps {
  color: string
  courses?: CourseWithSection[]
  dropZonesDomRects: DomRect | null
}

export const DragZone = ({ color, courses = [], dropZonesDomRects }: DragZoneProps) => {
  const { open } = useDialog()
  const { freeCourses, setFreeCourses, setSelectedCourses } = useStore()

  const handleOnDragEnd = (courseWithSection: CourseWithSection, { point }: PanInfo) => {
    if (!dropZonesDomRects) return
    if (isCoordsInDropBoundaries(point, dropZonesDomRects)) {
      const leftedBlocks = freeCourses.filter(({ course }) => course.id !== courseWithSection.course.id)
      setFreeCourses([...leftedBlocks])
      setSelectedCourses((prev) => [...prev, courseWithSection])
    }
  }

  return (
    <Root>
      {courses.map((courseWithSection, idx) => (
        <Block
          key={`DragZone-${courseWithSection.course.id}-${idx}`}
          color={color}
          label={courseWithSection.course.name}
          onDoubleClick={() => open(<BlockDetailDialog courseId={courseWithSection.course.id} from="dragzone" />)}
          onDragEnd={(_, info) => handleOnDragEnd(courseWithSection, info)}
        />
      ))}
    </Root>
  )
}
