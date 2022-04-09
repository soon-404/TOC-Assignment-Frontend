import { useEffect, useRef } from 'react'
import { Stack, Paper, styled } from '@mui/material'
import { Reorder, useMotionValue } from 'framer-motion'

import { useRaisedShadow } from 'hooks/useRaiseShadow'

import { Block } from 'components/Block'

import { Course, IDomRect } from 'types'

const Root = styled(Paper)(() => ({
  minHeight: 132,
}))

interface IDropZone {
  color: string
  courses: Course[]
  handleDropZonesDOMRects?: (zoneBoundingArea: IDomRect) => void
  width: number
  height: number
  onReorder: React.Dispatch<React.SetStateAction<Course[]>>
}

export const DropZone: React.FC<IDropZone> = ({
  color,
  courses,
  handleDropZonesDOMRects,
  width,
  onReorder,
  height,
}) => {
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)
  const zoneRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const zoneRefEl = zoneRef.current
    if (zoneRefEl && handleDropZonesDOMRects) {
      handleDropZonesDOMRects({
        top: zoneRefEl.getBoundingClientRect().top + window.scrollY,
        left: zoneRefEl.getBoundingClientRect().left,
        right: zoneRefEl.getBoundingClientRect().right,
        bottom: zoneRefEl.getBoundingClientRect().bottom,
      })
    }
  }, [width, height, courses])

  return (
    <Root ref={zoneRef}>
      <Reorder.Group axis="x" onReorder={onReorder} values={courses} style={{ y, boxShadow, margin: 0, padding: 0 }}>
        <Stack direction="row" spacing={2} rowGap={2} flexWrap="wrap">
          {courses.map((course) => (
            <Reorder.Item style={{ listStyle: 'none' }} key={course.id} value={course}>
              <Block color={color} label={course.name} />
            </Reorder.Item>
          ))}
        </Stack>
      </Reorder.Group>
    </Root>
  )
}
