import { Box, List, Stack } from '@mui/material'
import { Block } from 'components/Block'
import { Reorder, useMotionValue } from 'framer-motion'
import { useRaisedShadow } from 'hooks/useRaiseShadow'
import { IDomRect, IdragUpdate } from 'lib/utils'
import { useEffect, useRef, useState } from 'react'
import { SubjectBlock } from 'types'

interface IDropZone {
  color: string
  blocks: SubjectBlock[]
  handleDropZonesDOMRects?: (zoneBoundingArea: IDomRect) => void
  width: number
  height: number
  onReorder: React.Dispatch<React.SetStateAction<SubjectBlock[]>>
}

export const DropZone: React.FC<IDropZone> = ({ color, blocks, handleDropZonesDOMRects, width, onReorder, height }) => {
  const y = useMotionValue(0)
  const boxShadow = useRaisedShadow(y)
  const zoneRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

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
  }, [width, height, blocks])

  return (
    <div ref={zoneRef} style={{ position: 'relative' }}>
      <Box
        sx={{
          background: 'black',
          opacity: '0.5',
          borderRadius: '20px',
          width: '100%',
          minHeight: '150px',
          height: '100%',
          position: 'absolute',
        }}
      />
      <List
        sx={{
          width: '100%',
          height: '100%',
          minHeight: '150px',
          position: 'relative',
        }}
      >
        <Reorder.Group axis="x" onReorder={onReorder} values={blocks} style={{ y, boxShadow }}>
          <Stack direction="row" spacing={2} rowGap={2} flexWrap="wrap">
            {blocks &&
              blocks.map((block) => (
                <Reorder.Item style={{ listStyle: 'none' }} key={block.id} value={block}>
                  <Block
                    drag
                    dragConstraints={{ top: 0, bottom: 0, right: 0, left: 0 }}
                    dragElastic={1}
                    initial={false}
                    animate={{ backgroundColor: color }}
                  >
                    {block.title}
                  </Block>
                </Reorder.Item>
              ))}
          </Stack>
        </Reorder.Group>
      </List>
    </div>
  )
}
