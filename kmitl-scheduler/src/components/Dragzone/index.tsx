import { useCallback, useState } from 'react'
import { styled, Paper } from '@mui/material'
import { Block } from 'components/Block'
import { BlockDetailDialog } from 'components/Dialog/BlockDetailDialog'
import { PanInfo } from 'framer-motion'
import { Course, IdragUpdate } from 'types'
import { useDialog } from 'hooks/useStore'

const Root = styled(Paper)(() => ({
  gap: 16,
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  minHeight: 132,
}))

interface IDragZone {
  color: string
  courses: Course[]
  handleOnDrag: (dragUpdate: IdragUpdate) => void
  moveToSelectedBlocks: (course: Course) => void
}

export const DragZone: React.FC<IDragZone> = ({
  color,
  courses,
  handleOnDrag: onDragCallback,
  moveToSelectedBlocks,
}) => {
  const { open } = useDialog()

  const [isDragging, setIsDragging] = useState(false) // * Unuse now

  const handleOnDoubleClick = useCallback((course: Course) => {
    open(() => <BlockDetailDialog course={course} onAddToSchedule={() => moveToSelectedBlocks(course)} />)
  }, [])

  const handleOnDrag = (course: Course, info: PanInfo) => {
    setIsDragging(true)
    onDragCallback({
      action: 'onDrag',
      draggableCoords: { x: info.point.x, y: info.point.y },
      inComingBlock: course,
    })
  }

  const handleOnDragEnd = (course: Course, info: PanInfo) => {
    setIsDragging(false)
    onDragCallback({
      action: 'onDragEnd',
      draggableCoords: { x: info.point.x, y: info.point.y },
      inComingBlock: course,
    })
  }

  return (
    <Root>
      {courses?.map((course) => (
        <Block
          key={course.id}
          color={color}
          label={course.name}
          onDoubleClick={() => handleOnDoubleClick(course)}
          onDrag={(_, info) => handleOnDrag(course, info)}
          onDragEnd={(_, info) => handleOnDragEnd(course, info)}
        />
      ))}
    </Root>
  )
}
