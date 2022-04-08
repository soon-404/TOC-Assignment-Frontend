import { Box, List, Stack } from '@mui/material'
import { Block } from 'components/Block'
import BlockDetailDialog from 'components/Dialog/BlockDetailDialog'

import { useState } from 'react'
import { SubjectBlock, IdragUpdate } from 'types'

interface IDragZone {
  color: string
  blocks: SubjectBlock[]
  handleOnDrag?: (dragUpdate: IdragUpdate) => void
}
export const DragZone: React.FC<IDragZone> = ({ color, blocks, handleOnDrag }) => {
  const [open, setOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleOnClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          background: 'black',
          opacity: '0.5',
          borderRadius: '20px',
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      />
      <List
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
          borderRadius: '10px',
          p: 3,
        }}
      >
        <Stack direction="row" spacing={2} rowGap={2} flexWrap="wrap" justifyContent="flex-start">
          {blocks &&
            blocks.map((block) => (
              <Block
                key={block.id}
                drag={true}
                initial={false}
                animate={{ backgroundColor: color }}
                dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
                dragElastic={1}
                dragTransition={{
                  bounceStiffness: 300,
                  bounceDamping: 25,
                }}
                onDoubleClick={(e) => {
                  setOpen(true)
                  // console.log('double click')
                }}
                onDrag={(_, info) => {
                  setIsDragging(true)
                  if (handleOnDrag) {
                    setIsDragging(true)

                    handleOnDrag({
                      action: 'onDrag',
                      draggableCoords: { x: info.point.x, y: info.point.y },
                      inComingBlock: block,
                    })
                  }
                }}
                onDragEnd={(_, info) => {
                  setIsDragging(false)

                  if (handleOnDrag)
                    handleOnDrag({
                      action: 'onDragEnd',
                      draggableCoords: { x: info.point.x, y: info.point.y },
                      inComingBlock: block,
                    })
                }}
              >
                {block.title}
              </Block>
            ))}
        </Stack>
      </List>
      <BlockDetailDialog open={open} onClose={handleOnClose} />
    </Box>
  )
}
