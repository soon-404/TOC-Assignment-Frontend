import { styled } from '@mui/system'
import { motion, PanInfo } from 'framer-motion'
import { ReactNode, useState } from 'react'

const StyledBlock = styled(motion.div)(() => ({
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'auto',
  maxWidth: '300px',
  minHeight: '100px',
  alignSelf: 'stretch',
  borderRadius: '20px',
  color: 'white',
  padding: '4px 16px',
  cursor: 'grab',
}))

const BlockClone = styled(StyledBlock)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1,
}))

type FramerEventType = MouseEvent | TouchEvent | PointerEvent

interface BlockProps {
  label?: ReactNode
  color?: string
  isCoordsInBox?: (info: PanInfo) => boolean
  onDoubleClick?: () => void
  onDragEnd?: (event: FramerEventType, info: PanInfo) => void
}

export const Block = ({ label, color = 'white', isCoordsInBox, ...event }: BlockProps) => {
  const [pale, setPale] = useState<boolean>(false)

  return (
    <StyledBlock
      drag={true}
      initial={false}
      animate={{ backgroundColor: color }}
      whileDrag={{ zIndex: 6969, cursor: 'grabbing' }}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={1}
      dragTransition={{
        bounceStiffness: 300,
        bounceDamping: 25,
      }}
      sx={{ opacity: pale ? 0.7 : 1 }}
      onDrag={isCoordsInBox ? (_, info) => setPale(!isCoordsInBox(info)) : undefined}
      {...event}
    >
      {label}
      <BlockClone />
    </StyledBlock>
  )
}
