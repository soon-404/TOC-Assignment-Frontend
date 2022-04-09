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
      id: '624d28387d8bed5a5f5f279b',
      building: 'Henrietta',
      classYear: '1',
      start: '2020-04-08T09:00:00+00:00',
      end: '2020-04-08T12:00:00+00:00',
      courseId: '018963042',
      courseName: 'Omar',
      note: 'Esse sint minim ad ut aliquip enim sit do laboris proident et eiusmod laborum est.',
      type: 'ปฏิบัติ',
      credit: '4(1-1-2)',
      final: {
        end: '2020-06-08T09:00:00+00:00',
        start: '2020-06-08T12:00:00+00:00',
      },
      midterm: 'ไม่มีสอบ',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['2'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d28389fde785d6026dad4',
      building: 'Aguila',
      classYear: '2',
      start: '',
      end: '',
      courseId: '013226165',
      courseName: 'Bodega',
      note: 'Sit veniam in et consequat ea.',
      type: 'ปฏิบัติ',
      credit: '5(3-2-2)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'ไม่มีสอบ',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['2'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d283825b6581916571308',
      building: 'Greensburg',
      classYear: '4',
      start: '',
      end: '',
      courseId: '019759573',
      courseName: 'Richmond',
      note: 'Tempor officia officia nostrud pariatur adipisicing velit ad amet commodo exercitation laboris excepteur.',
      type: 'ปฏิบัติ',
      credit: '3(2-1-2)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'จัดสอบเอง',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['1'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d28384374647c32ec00df',
      building: 'Berlin',
      classYear: '3',
      start: '',
      end: '',
      courseId: '012484338',
      courseName: 'Valle',
      note: 'Non nostrud ex magna voluptate commodo dolor aliquip fugiat minim magna.',
      type: 'ทฤษฎี',
      credit: '5(2-2-2)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'ไม่มีสอบ',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['2'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d28381255e4049965fa3f',
      building: 'Dalton',
      classYear: '3',
      start: '',
      end: '',
      courseId: '011650633',
      courseName: 'Nescatunga',
      note: 'Proident officia culpa reprehenderit non dolor fugiat adipisicing qui exercitation.',
      type: 'ทฤษฎี',
      credit: '4(2-1-1)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'ไม่มีสอบ',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['2'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d283817fb5cf352596e1d',
      building: 'Cade',
      classYear: '2',
      start: '',
      end: '',
      courseId: '013658849',
      courseName: 'Irwin',
      note: 'Exercitation reprehenderit nulla do cillum exercitation id eiusmod ipsum.',
      type: 'ปฏิบัติ',
      credit: '4(1-3-1)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'ไม่มีสอบ',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['1'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d2838e07c9899355d2514',
      building: 'Cawood',
      classYear: '3',
      start: '',
      end: '',
      courseId: '016889417',
      courseName: 'Winesburg',
      note: 'Non pariatur ipsum Lorem esse ut ex eu ut dolor eu aliquip.',
      type: 'ทฤษฎี',
      credit: '3(3-1-1)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'ไม่มีสอบ',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['2'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d28383037822f80cc0f2b',
      building: 'Sheatown',
      classYear: '1',
      start: '',
      end: '',
      courseId: '013513964',
      courseName: 'Tyhee',
      note: 'Elit velit officia cillum tempor excepteur incididunt nisi sunt ea id eiusmod eiusmod.',
      type: 'ปฏิบัติ',
      credit: '5(3-2-1)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'จัดสอบเอง',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['1'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d28385369bec71e73d12e',
      building: 'Foscoe',
      classYear: '4',
      start: '',
      end: '',
      courseId: '011648078',
      courseName: 'Woodburn',
      note: 'Minim sunt ipsum cillum irure magna et.',
      type: 'ทฤษฎี',
      credit: '5(3-2-2)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'จัดสอบเอง',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['2'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d2838d5e1a757a0e08ffe',
      building: 'Eden',
      classYear: '3',
      start: '',
      end: '',
      courseId: '014699326',
      courseName: 'Lumberton',
      note: 'Ut est ipsum labore sint aliquip.',
      type: 'ทฤษฎี',
      credit: '3(1-1-1)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'ไม่มีสอบ',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['2'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d28389bd7cc23f949b8f2',
      building: 'Wattsville',
      classYear: '2',
      start: '',
      end: '',
      courseId: '018295094',
      courseName: 'Fingerville',
      note: 'Sint deserunt sint ut eu consectetur duis anim dolore consequat non proident laboris amet mollit.',
      type: 'ปฏิบัติ',
      credit: '5(3-1-1)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'ไม่มีสอบ',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['2'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d283815f52e2247a6bc5a',
      building: 'Groveville',
      classYear: '2',
      start: '',
      end: '',
      courseId: '017999297',
      courseName: 'Fairforest',
      note: 'Et do laboris ex amet excepteur in anim labore eu in.',
      type: 'ทฤษฎี',
      credit: '4(1-2-3)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'ไม่มีสอบ',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['1'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d2838d57011ed3da0e430',
      building: 'Smock',
      classYear: '1',
      start: '',
      end: '',
      courseId: '016606043',
      courseName: 'Chamizal',
      note: 'Eu nostrud sit eiusmod reprehenderit aute deserunt ut deserunt nostrud eu duis mollit et.',
      type: 'ทฤษฎี',
      credit: '4(1-2-1)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'จัดสอบเอง',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['1'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d28387afba418883fe7b4',
      building: 'Interlochen',
      classYear: '1',
      start: '',
      end: '',
      courseId: '011841707',
      courseName: 'Fairview',
      note: 'Eiusmod cupidatat excepteur officia esse duis anim ullamco anim.',
      type: 'ปฏิบัติ',
      credit: '5(2-2-2)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'จัดสอบเอง',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['2'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d28385d77056623624a01',
      building: 'Century',
      classYear: '1',
      start: '',
      end: '',
      courseId: '017059755',
      courseName: 'Crawfordsville',
      note: 'Sint elit cupidatat aliquip minim magna.',
      type: 'ทฤษฎี',
      credit: '3(1-3-2)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'จัดสอบเอง',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['2'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d2838298edc35ffc7ee48',
      building: 'Gilmore',
      classYear: '1',
      start: '',
      end: '',
      courseId: '011202164',
      courseName: 'Edmund',
      note: 'Incididunt consectetur eu officia dolor in pariatur velit Lorem voluptate.',
      type: 'ทฤษฎี',
      credit: '4(1-1-1)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'ไม่มีสอบ',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['2'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d28388db1ef62a449c39e',
      building: 'Alden',
      classYear: '4',
      start: '',
      end: '',
      courseId: '017276714',
      courseName: 'Sanford',
      note: 'Reprehenderit cillum mollit id mollit et velit duis enim.',
      type: 'ทฤษฎี',
      credit: '5(1-2-1)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'จัดสอบเอง',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['2'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d28385e4e8a85ae46bbb9',
      building: 'Escondida',
      classYear: '1',
      start: '',
      end: '',
      courseId: '017645004',
      courseName: 'Bartley',
      note: 'Culpa ut cillum culpa sint ipsum.',
      type: 'ทฤษฎี',
      credit: '4(1-1-3)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'ไม่มีสอบ',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['2'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d283856c0d9792ab968ce',
      building: 'Ribera',
      classYear: '1',
      start: '',
      end: '',
      courseId: '014084329',
      courseName: 'Stonybrook',
      note: 'Fugiat minim magna elit enim amet proident sunt veniam deserunt qui consectetur.',
      type: 'ทฤษฎี',
      credit: '5(3-3-1)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'ไม่มีสอบ',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['2'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
    {
      id: '624d2838fc1d0ab105a84266',
      building: 'Delco',
      classYear: '1',
      start: '',
      end: '',
      courseId: '013331985',
      courseName: 'Columbus',
      note: 'Magna fugiat est excepteur cupidatat aliquip excepteur sint sit non ex minim exercitation occaecat labore.',
      type: 'ปฏิบัติ',
      credit: '3(2-2-1)',
      final: {
        end: '',
        start: '',
      },
      midterm: 'จัดสอบเอง',
      restriction: [''],
      room: '',
      schedule: [''],
      section: ['2'],
      teacher: ['รศ.ดร.เกียรติกูล เจียรนัยธนะกิจ'],
      color: '#f107a3',
    },
  ]
  // const initialBlocks: SubjectBlock[] = [
  //   {
  //     id: '1',
  //     title: 'คณิตศาสตร์',
  //     start: '2022-04-04T10:16:18+00:00',
  //     end: '2022-04-04T12:16:18+00:00',
  //     color: '#f107a3',
  //   },
  //   {
  //     id: '2',
  //     title: 'ภาษาไทย',
  //     start: '2022-04-05T14:16:18+00:00',
  //     end: '2022-04-05T16:16:18+00:00',
  //     color: '#f107a3',
  //   },
  //   {
  //     id: '3',
  //     title: 'วิทยาศาสตร์',
  //     start: '2022-04-06T14:16:18+00:00',
  //     end: '2022-04-06T16:16:18+00:00',
  //     color: '#f107a3',
  //   },
  //   {
  //     id: '4',
  //     title: 'สังคมศึกษา',
  //     start: '2022-04-07T14:16:18+00:00',
  //     end: '2022-04-07T16:16:18+00:00',
  //     color: '#f107a3',
  //   },
  //   {
  //     id: '5',
  //     title: 'อังกฤษ',
  //     start: '2022-04-08T14:16:18+00:00',
  //     end: '2022-04-08T16:16:18+00:00',
  //     color: '#f107a3',
  //   },
  //   {
  //     id: '6',
  //     title: 'พละ',
  //     start: '2022-04-09T14:16:18+00:00',
  //     end: '2022-04-09T16:16:18+00:00',
  //     color: '#f107a3',
  //   },
  //   {
  //     id: '7',
  //     title: 'การงาน',
  //     start: '2022-04-10T14:16:18+00:00',
  //     end: '2022-04-10T16:16:18+00:00',
  //     color: '#f107a3',
  //   },
  //   {
  //     id: '8',
  //     title: 'เทคโนโลยี',
  //     start: '2022-04-11T14:16:18+00:00',
  //     end: '2022-04-11T16:16:18+00:00',
  //     color: '#f107a3',
  //   },
  //   {
  //     id: '9',
  //     title: 'ชีวิต',
  //     start: '2022-04-12T14:16:18+00:00',
  //     end: '2022-04-12T16:16:18+00:00',
  //     color: '#f107a3',
  //   },
  //   {
  //     id: '10',
  //     title: 'สุขภาพ',
  //     start: '2022-04-13T14:16:18+00:00',
  //     end: '2022-04-13T16:16:18+00:00',
  //     color: '#f107a3',
  //   },
  //   {
  //     id: '11',
  //     title: 'จิตวิทยา',
  //     start: '2022-04-14T14:16:18+00:00',
  //     end: '2022-04-14T16:16:18+00:00',
  //     color: '#f107a3',
  //   },
  //   {
  //     id: '12',
  //     title: 'ขนม',
  //     start: '2022-04-15T14:16:18+00:00',
  //     end: '2022-04-15T16:16:18+00:00',
  //     color: '#f107a3',
  //   },
  //   {
  //     id: '13',
  //     title: 'คมนาคม',
  //     start: '2022-04-16T14:16:18+00:00',
  //     end: '2022-04-16T16:16:18+00:00',
  //     color: '#f107a3',
  //   },
  //   {
  //     id: '14',
  //     title: 'ทางบิน',
  //     start: '2022-04-17T14:16:18+00:00',
  //     end: '2022-04-17T16:16:18+00:00',
  //     color: '#f107a3',
  //   },
  //   {
  //     id: '15',
  //     title: 'วิศวกรรม',
  //     start: '2022-04-18T14:16:18+00:00',
  //     end: '2022-04-18T16:16:18+00:00',
  //     color: '#f107a3',
  //   },
  // ]

  const { width, height } = useWindowSize()

  const [blocks, setBlocks] = useState(initialBlocks)
  const [selectedBlocks, setSelectedBlocks] = useState<SubjectBlock[]>([])
  const [isHoverItsDropzone, setIsHoverItsDropzone] = useState(false) // Not using now
  const [dropZonesDOMRects, setdropZonesDOMRects] = useState<any | null>(null)

  const handleOnDrag = ({ action, draggableCoords, inComingBlock }: IdragUpdate) => {
    // console.log(dropZonesDOMRects)
    const isInDropzoneBoundaries = isCoordsInDropBoundaries(draggableCoords, dropZonesDOMRects)
    switch (action) {
      case 'onDrag':
        if (isInDropzoneBoundaries) {
          // console.log('In dropzone')
          setIsHoverItsDropzone(true)
        } else {
          setIsHoverItsDropzone(false)
        }
        break
      case 'onDragEnd':
        if (isInDropzoneBoundaries) {
          setIsHoverItsDropzone(false)
          moveToSelectedBlocks(inComingBlock)
        }
        break
    }
  }
  const handleDropZonesDOMRects = (zoneBoundingArea: IDomRect) => {
    setdropZonesDOMRects((prev: any) => ({ ...prev, ...zoneBoundingArea }))
  }

  const moveToSelectedBlocks = (block?: SubjectBlock) => {
    if (!block) return
    const leftedBlocks = blocks.filter((b) => b.id !== block.id)
    setBlocks([...leftedBlocks])
    setSelectedBlocks((prev) => [...prev, block])
  }

  // const [myEvents, setEvents] = React.useState([])

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
    // console.log(event)
    toast({
      message: event.event.title,
    })
  }, [])

  return (
    <AnimateSharedLayout>
      <AppWrapper>
        <Header />
        {/* <StepCard stepContents={[<DropItem />, <Box>pages 2</Box>, <Box>pages 3</Box>]} onFinish={() => {}} /> */}
        <MainWrapper>
          <DragZone
            color="#f107a3"
            blocks={blocks}
            handleOnDrag={handleOnDrag}
            moveToSelectedBlocks={moveToSelectedBlocks}
          />
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
              title: block.courseName,
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
