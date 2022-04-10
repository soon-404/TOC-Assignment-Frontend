import { useState, useCallback } from 'react'
import { Stack } from '@mui/material'
import { Eventcalendar as EventCalendar, toast, localeTh } from '@mobiscroll/react'

import { DragZone } from 'components/Dragzone'
import { DropZone } from 'components/Dropzone'

import { isCoordsInDropBoundaries } from 'utils/dropzone'

import { Course, IDomRect, IdragUpdate } from 'types'

import { useWindowSize } from 'hooks/useWindowSize'

import { courses } from 'mock/courses'

export const MajorSchedule = () => {
  const { width, height } = useWindowSize()

  const [freeCourses, setFreeCourses] = useState<Course[]>(courses)
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([])
  const [isHoverItsDropzone, setIsHoverItsDropzone] = useState<boolean>(false)
  const [dropZonesDOMRects, setdropZonesDOMRects] = useState<IDomRect | null>()

  const handleOnDrag = ({ action, draggableCoords, inComingBlock }: IdragUpdate) => {
    if (!dropZonesDOMRects) return

    const isInDropzoneBoundaries = isCoordsInDropBoundaries(draggableCoords, dropZonesDOMRects)

    switch (action) {
      case 'onDrag': {
        if (isInDropzoneBoundaries) {
          setIsHoverItsDropzone(true)
        } else {
          setIsHoverItsDropzone(false)
        }
        return
      }
      case 'onDragEnd': {
        if (isInDropzoneBoundaries) {
          setIsHoverItsDropzone(false)
          const leftedBlocks = freeCourses.filter((freeCourse) => freeCourse.id !== inComingBlock.id)
          setFreeCourses([...leftedBlocks])
          setSelectedCourses((prev) => [...prev, inComingBlock])
        }
        return
      }
    }
  }

  const handleDropZonesDOMRects = useCallback((zoneBoundingArea: IDomRect) => {
    setdropZonesDOMRects((prev: any) => ({ ...prev, ...zoneBoundingArea }))
  }, [])

  const handleMoveToSelectedBlocks = useCallback(
    (course: Course) => setSelectedCourses((prev) => [...prev, course]),
    [],
  )

  const onEventClick = useCallback((event) => {
    toast({
      message: event.event.title,
    })
  }, [])

  console.log('MajorSchedule rerender')

  return (
    <Stack gap={2}>
      <DragZone
        color="#f107a3"
        courses={freeCourses}
        handleOnDrag={handleOnDrag}
        moveToSelectedBlocks={handleMoveToSelectedBlocks}
      />
      <DropZone
        color="#7b2ff7"
        width={width}
        height={height}
        handleDropZonesDOMRects={handleDropZonesDOMRects}
        courses={selectedCourses}
        onReorder={setSelectedCourses}
      />
      <EventCalendar
        theme="ios"
        themeVariant="light"
        clickToCreate={false}
        dragToCreate={false}
        dragToMove={false}
        dragToResize={false}
        locale={localeTh}
        // TODO : implement data of schedule
        data={selectedCourses.map((course) => ({
          id: course.id,
          title: course.name,
          start: '',
          end: '',
          color: '#f107a3',
        }))}
        view={{
          schedule: {
            type: 'week',
          },
        }}
        onEventClick={onEventClick}
      />
    </Stack>
  )
}
