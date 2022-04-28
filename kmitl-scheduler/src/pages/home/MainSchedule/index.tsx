import { useState, useCallback, useMemo } from 'react'
import { Stack } from '@mui/material'
import { Eventcalendar as EventCalendar, toast, localeTh } from '@mobiscroll/react'
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { DragZone } from 'components/Dragzone'
import { DropZone } from 'components/Dropzone'
import SearchBar from 'components/SearchBar'

import { useStore } from 'hooks/useStore'

import { CourseType, DomRect } from 'types'
import { getAllSchedules } from 'utils/course'

type MainScheduleProps = {
  courseType: CourseType
}
export const MainSchedule = ({ courseType }: MainScheduleProps) => {
  const { allCourses, selectedCourses, sectionMapping } = useStore()

  const [dropZonesDomRects, setDropZonesDomRects] = useState<DomRect | null>(null)

  const onEventClick = useCallback((event) => toast({ message: event.event.title }), [])

  const allSchedule = useMemo(() => getAllSchedules(allCourses, selectedCourses, sectionMapping), [selectedCourses])

  return (
    <Stack gap={2}>
      <SearchBar courseType={courseType} />
      <DragZone color="#f107a3" courseType={courseType} dropZonesDomRects={dropZonesDomRects} />
      <DropZone
        color="#7b2ff7"
        courseType={courseType}
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
