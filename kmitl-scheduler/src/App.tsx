import { Box, Container, List, Stack, styled } from '@mui/material'
import { DragZone } from 'components/Dragzone'
import { DropItem } from 'components/DropItem'
import { DropZone } from 'components/Dropzone'
import { Header } from 'components/Header'
import { StepCard } from 'components/StepperCard'
import { AnimateSharedLayout, motion, Reorder, TapInfo, useMotionValue } from 'framer-motion'
import { useRaisedShadow } from 'hooks/useRaiseShadow'
import { useViewportWidth } from 'hooks/useViewportWidth'
import { IDomRect, IdragUpdate, isCoordsInDropBoundaries, SubjectBlock } from 'lib/utils'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useWindowSize } from 'usehooks-ts'

const AppWrapper = styled(Container)(() => ({
  minHeight: '100vh',
  width: 'auto',
  background: 'linear-gradient(250deg, #7b2ff7, #f107a3)',
}))

const DragAndDropWrapper = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}))

export const App = () => {
  const initialBlocks: SubjectBlock[] = [
    {
      id: '1',
      name: 'คณิตศาสตร์',
      x: 0,
      y: 0,
    },
    {
      id: '2',
      name: 'ภาษาไทย',
      x: 0,
      y: 1,
    },
    {
      id: '3',
      name: 'วิทยาศาสตร์',
      x: 1,
      y: 0,
    },
    {
      id: '4',
      name: 'สังคมศึกษา',
      x: 1,
      y: 1,
    },
    {
      id: '5',
      name: 'อังกฤษ',
      x: 1,
      y: 1,
    },
    {
      id: '6',
      name: 'พละ',
      x: 1,
      y: 1,
    },
    {
      id: '7',
      name: 'การงาน',
      x: 1,
      y: 1,
    },
    {
      id: '8',
      name: 'เทคโนโลยี',
      x: 1,
      y: 1,
    },
    {
      id: '9',
      name: 'ชีวิต',
      x: 1,
      y: 1,
    },
    {
      id: '10',
      name: 'สุขภาพ',
      x: 1,
      y: 1,
    },
    {
      id: '11',
      name: 'จิตวิทยา',
      x: 1,
      y: 1,
    },
    {
      id: '12',
      name: 'ขนม',
      x: 1,
      y: 1,
    },
    {
      id: '13',
      name: 'คมนาคม',
      x: 1,
      y: 1,
    },
    {
      id: '14',
      name: 'ทางบิน',
      x: 1,
      y: 1,
    },
    {
      id: '15',
      name: 'วิศวกรรม',
      x: 1,
      y: 1,
    },
  ]

  const { width, height } = useWindowSize()

  const [blocks, setBlocks] = useState(initialBlocks)
  const [selectedBlocks, setSelectedBlocks] = useState<SubjectBlock[]>([])
  const [isHoverItsDropzone, setIsHoverItsDropzone] = useState(false) // Not using now
  const [dropZonesDOMRects, setdropZonesDOMRects] = useState<any | null>(null)

  const handleOnDrag = ({ action, draggableCoords, inComingBlock }: IdragUpdate) => {
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

  return (
    <AnimateSharedLayout>
      <AppWrapper>
        <Header />
        {/* <StepCard stepConte,nts={[<DropItem />, <Box>pages 2</Box>, <Box>pages 3</Box>]} onFinish={() => {}} /> */}
        <DragAndDropWrapper>
          <DragZone color="#f107a3" blocks={blocks} handleOnDrag={handleOnDrag} />
          <DropZone
            color="#7b2ff7"
            width={width}
            height={height}
            handleDropZonesDOMRects={handleDropZonesDOMRects}
            blocks={selectedBlocks}
            onReorder={setSelectedBlocks}
          />
        </DragAndDropWrapper>
      </AppWrapper>
    </AnimateSharedLayout>
  )
}
