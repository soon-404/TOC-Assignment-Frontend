import { PanInfo } from 'framer-motion'
import { styled, Paper } from '@mui/material'
import { Block } from 'components/Block'
import { BlockDetailDialog } from 'components/Dialog/BlockDetailDialog'
import { useDialog, useStore } from 'hooks/useStore'
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

interface DragZoneProps {
  color: string
  dropZonesDomRects: DomRect | null
  courseType: CourseType
}

export const DragZone = ({ color, courseType, dropZonesDomRects }: DragZoneProps) => {
  const { open } = useDialog()
  const { allCourses, addCourse, unselectedCourses } = useStore()

  const handleOnDragEnd = (courseId: CourseId, { point }: PanInfo) => {
    if (!dropZonesDomRects) return
    if (isCoordsInDropBoundaries(point, dropZonesDomRects)) addCourse(courseId)
  }

  return (
    <Root>
      {unselectedCourses[courseType].map((courseId) => (
        <Block
          key={`DragZone-${courseId}`}
          color={color}
          label={allCourses[courseId].name}
          onDoubleClick={() => open(<BlockDetailDialog courseId={courseId} courseType={courseType} />)}
          onDragEnd={(_, info) => handleOnDragEnd(courseId, info)}
        />
      ))}
    </Root>
  )
}
