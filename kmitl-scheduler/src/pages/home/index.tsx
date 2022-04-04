import React from 'react'
import { Box, Container, List, Stack, styled } from '@mui/material'
import { DragZone } from 'components/Dragzone'

import { DropZone } from 'components/Dropzone'
import { Header } from 'components/Header'

import { AnimateSharedLayout } from 'framer-motion'

import { IDomRect, IdragUpdate, isCoordsInDropBoundaries } from 'lib/utils'
import { useState } from 'react'
import { useWindowSize } from 'usehooks-ts'

import '@mobiscroll/react/dist/css/mobiscroll.min.css'
import { Eventcalendar as EventCalendar, getJson, toast, localeTh } from '@mobiscroll/react'
import { SubjectBlock } from 'types'

const AppWrapper = styled(Container)(() => ({
  minHeight: '100vh',
  width: 'auto',
  background: 'linear-gradient(250deg, #7b2ff7, #f107a3)',
}))

const MainWrapper = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  paddingBottom: '20px',
}))

export const Home: React.FC = () => {
  const initialBlocks: SubjectBlock[] = [
    {
      id: '1',
      title: 'คณิตศาสตร์',
      start: '2022-04-04T10:16:18+00:00',
      end: '2022-04-04T12:16:18+00:00',
      color: '#f107a3',
    },
    {
      id: '2',
      title: 'ภาษาไทย',
      start: '2022-04-05T14:16:18+00:00',
      end: '2022-04-05T16:16:18+00:00',
      color: '#f107a3',
    },
    {
      id: '3',
      title: 'วิทยาศาสตร์',
      start: '2022-04-06T14:16:18+00:00',
      end: '2022-04-06T16:16:18+00:00',
      color: '#f107a3',
    },
    {
      id: '4',
      title: 'สังคมศึกษา',
      start: '2022-04-07T14:16:18+00:00',
      end: '2022-04-07T16:16:18+00:00',
      color: '#f107a3',
    },
    {
      id: '5',
      title: 'อังกฤษ',
      start: '2022-04-08T14:16:18+00:00',
      end: '2022-04-08T16:16:18+00:00',
      color: '#f107a3',
    },
    {
      id: '6',
      title: 'พละ',
      start: '2022-04-09T14:16:18+00:00',
      end: '2022-04-09T16:16:18+00:00',
      color: '#f107a3',
    },
    {
      id: '7',
      title: 'การงาน',
      start: '2022-04-10T14:16:18+00:00',
      end: '2022-04-10T16:16:18+00:00',
      color: '#f107a3',
    },
    {
      id: '8',
      title: 'เทคโนโลยี',
      start: '2022-04-11T14:16:18+00:00',
      end: '2022-04-11T16:16:18+00:00',
      color: '#f107a3',
    },
    {
      id: '9',
      title: 'ชีวิต',
      start: '2022-04-12T14:16:18+00:00',
      end: '2022-04-12T16:16:18+00:00',
      color: '#f107a3',
    },
    {
      id: '10',
      title: 'สุขภาพ',
      start: '2022-04-13T14:16:18+00:00',
      end: '2022-04-13T16:16:18+00:00',
      color: '#f107a3',
    },
    {
      id: '11',
      title: 'จิตวิทยา',
      start: '2022-04-14T14:16:18+00:00',
      end: '2022-04-14T16:16:18+00:00',
      color: '#f107a3',
    },
    {
      id: '12',
      title: 'ขนม',
      start: '2022-04-15T14:16:18+00:00',
      end: '2022-04-15T16:16:18+00:00',
      color: '#f107a3',
    },
    {
      id: '13',
      title: 'คมนาคม',
      start: '2022-04-16T14:16:18+00:00',
      end: '2022-04-16T16:16:18+00:00',
      color: '#f107a3',
    },
    {
      id: '14',
      title: 'ทางบิน',
      start: '2022-04-17T14:16:18+00:00',
      end: '2022-04-17T16:16:18+00:00',
      color: '#f107a3',
    },
    {
      id: '15',
      title: 'วิศวกรรม',
      start: '2022-04-18T14:16:18+00:00',
      end: '2022-04-18T16:16:18+00:00',
      color: '#f107a3',
    },
  ]

  const { width, height } = useWindowSize()

  const [blocks, setBlocks] = useState(initialBlocks)
  const [selectedBlocks, setSelectedBlocks] = useState<SubjectBlock[]>([])
  const [isHoverItsDropzone, setIsHoverItsDropzone] = useState(false) // Not using now
  const [dropZonesDOMRects, setdropZonesDOMRects] = useState<any | null>(null)

  const handleOnDrag = ({ action, draggableCoords, inComingBlock }: IdragUpdate) => {
    console.log(dropZonesDOMRects)
    const isInDropzoneBoundaries = isCoordsInDropBoundaries(draggableCoords, dropZonesDOMRects)
    switch (action) {
      case 'onDrag':
        if (isInDropzoneBoundaries) {
          console.log('In dropzone')
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

  const [myEvents, setEvents] = React.useState([])

  // React.useEffect(() => {
  //   getJson(
  //     'https://trial.mobiscroll.com/events/?vers=5',
  //     (events) => {
  //       console.log(events)
  //       setEvents(events)
  //     },
  //     'jsonp',
  //   )
  // }, [])

  const onEventClick = React.useCallback((event) => {
    console.log(event)
    toast({
      message: event.event.title,
    })
  }, [])

  return (
    <AnimateSharedLayout>
      <AppWrapper>
        <Header />
        {/* <StepCard stepConte,nts={[<DropItem />, <Box>pages 2</Box>, <Box>pages 3</Box>]} onFinish={() => {}} /> */}
        <MainWrapper>
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
        </MainWrapper>
      </AppWrapper>
    </AnimateSharedLayout>
  )
}
