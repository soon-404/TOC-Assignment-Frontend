import { useState, useCallback, useEffect } from 'react'
import { Stack } from '@mui/material'
import { Eventcalendar as EventCalendar, toast, localeTh } from '@mobiscroll/react'

import { DragZone } from 'components/Dragzone'
import { DropZone } from 'components/Dropzone'

import { useStore } from 'hooks/useStore'

import { IDomRect } from 'types'

export const MajorSchedule = () => {
  const { freeCourses, selectedCourses } = useStore()

  const [dropZonesDomRects, setDropZonesDomRects] = useState<IDomRect | null>(null)

  const onEventClick = useCallback((event) => toast({ message: event.event.title }), [])

  return (
    <Stack gap={2}>
      <DragZone color="#f107a3" courses={freeCourses} dropZonesDomRects={dropZonesDomRects} />
      <DropZone
        color="#7b2ff7"
        courses={selectedCourses}
        dropZonesDomRects={dropZonesDomRects}
        setDropZonesDomRects={(dropZonesDomRects: IDomRect) => setDropZonesDomRects(dropZonesDomRects)}
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
