import { useState, useCallback, useEffect, useMemo } from 'react'
import { Stack } from '@mui/material'
import { flattenDeep } from 'lodash'
import moment from 'moment'
import { Eventcalendar as EventCalendar, toast, localeTh } from '@mobiscroll/react'

import { DragZone } from 'components/Dragzone'
import { DropZone } from 'components/Dropzone'

import { useStore } from 'hooks/useStore'

import { DomRect, EventToCalendar } from 'types'
import SearchBar from 'components/SearchBar'

export const MajorSchedule = () => {
  const { freeCourses, selectedCourses } = useStore()

  const [dropZonesDomRects, setDropZonesDomRects] = useState<DomRect | null>(null)

  const onEventClick = useCallback((event) => toast({ message: event.event.title }), [])

  const allSchedule = useMemo(() => {
    return flattenDeep(
      selectedCourses
        .filter(({ section }) => !!section.length)
        .map<Array<EventToCalendar>>((course) =>
          course.section[0].schedule.map(({ start, end }) => ({
            title: course.name,
            start: moment.unix(start),
            end: moment.unix(end),
            color: '#f107a3',
          })),
        ),
    )
  }, [selectedCourses])

  // * Enable this to log `allSchedule`
  // useEffect(() => console.log('allSchedule', allSchedule), [allSchedule])

  return (
    <Stack gap={2}>
      <SearchBar />
      <DragZone color="#f107a3" courses={freeCourses} dropZonesDomRects={dropZonesDomRects} />
      <DropZone
        color="#7b2ff7"
        courses={selectedCourses}
        dropZonesDomRects={dropZonesDomRects}
        setDropZonesDomRects={(dropZonesDomRects: DomRect) => setDropZonesDomRects(dropZonesDomRects)}
      />
      <EventCalendar
        theme="ios"
        themeVariant="light"
        clickToCreate={false}
        dragToCreate={false}
        dragToMove={false}
        dragToResize={false}
        locale={localeTh}
        data={allSchedule}
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
