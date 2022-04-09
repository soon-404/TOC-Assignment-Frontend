import { useState, useCallback } from 'react'
import { Box, Stack, styled } from '@mui/material'
import { Eventcalendar as EventCalendar, toast, localeTh } from '@mobiscroll/react'

import { DragZone } from 'components/Dragzone'
import { DropZone } from 'components/Dropzone'

import { isCoordsInDropBoundaries } from 'utils/dropzone'

import { IDomRect, IdragUpdate, SubjectBlock } from 'types'

import { useWindowSize } from 'hooks/useWindowSize'

import { initialBlocks } from 'mock/initialBlocks'

export const MajorSchedule = () => {
  const { width, height } = useWindowSize()

  const [blocks, setBlocks] = useState<SubjectBlock[]>(initialBlocks)
  const [selectedBlocks, setSelectedBlocks] = useState<SubjectBlock[]>([])
  const [isHoverItsDropzone, setIsHoverItsDropzone] = useState<boolean>(false) // Not using now
  const [dropZonesDOMRects, setdropZonesDOMRects] = useState<IDomRect | null>()

  const handleOnDrag = ({ action, draggableCoords, inComingBlock }: IdragUpdate) => {
    if (!dropZonesDOMRects) return

    const isInDropzoneBoundaries = isCoordsInDropBoundaries(draggableCoords, dropZonesDOMRects)

    switch (action) {
      case 'onDrag':
        if (isInDropzoneBoundaries) {
          setIsHoverItsDropzone(true)
        } else {
          setIsHoverItsDropzone(false)
        }
        break

      case 'onDragEnd':
        if (isInDropzoneBoundaries) {
          setIsHoverItsDropzone(false)
          const leftedBlocks = blocks.filter((block) => block.id !== inComingBlock.id)
          setBlocks([...leftedBlocks])
          setSelectedBlocks((prev) => [...prev, inComingBlock])
        }
        break
    }
  }

  const handleDropZonesDOMRects = (zoneBoundingArea: IDomRect) => {
    setdropZonesDOMRects((prev: any) => ({ ...prev, ...zoneBoundingArea }))
  }

  const onEventClick = useCallback((event) => {
    toast({
      message: event.event.title,
    })
  }, [])

  return (
    <Stack gap={2}>
      <DragZone color="#f107a3" blocks={blocks} handleOnDrag={handleOnDrag} />
      <DropZone
        color="#7b2ff7"
        width={width}
        height={height}
        handleDropZonesDOMRects={handleDropZonesDOMRects}
        blocks={selectedBlocks}
        onReorder={setSelectedBlocks}
      />
      <EventCalendar
        theme="ios"
        themeVariant="light"
        clickToCreate={false}
        dragToCreate={false}
        dragToMove={false}
        dragToResize={false}
        locale={localeTh}
        data={selectedBlocks.map((block) => ({
          id: block.id,
          title: block.title,
          start: block.start,
          end: block.end,
          color: block.color,
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
