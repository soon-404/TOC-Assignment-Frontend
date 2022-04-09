import { styled } from '@mui/system'
import { motion, PanInfo } from 'framer-motion'
import { ReactNode } from 'react'

export const Root = styled(motion.div)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'auto',
  maxWidth: '300px',
  minHeight: '100px',
  alignSelf: 'stretch',
  borderRadius: '20px',
  color: 'white',
  padding: '4px 16px',
  zIndex: '1',
}))

type FramerEventType = MouseEvent | TouchEvent | PointerEvent

interface BlockProps {
  label?: ReactNode
  color?: string
  onDoubleClick?: () => void
  onDrag?: (event: FramerEventType, info: PanInfo) => void
  onDragEnd?: (event: FramerEventType, info: PanInfo) => void
}

export const Block = ({ label, color = 'white', ...event }: BlockProps) => {
  return (
    <Root
      drag={true}
      initial={false}
      animate={{ backgroundColor: color }}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      dragElastic={1}
      dragTransition={{
        bounceStiffness: 300,
        bounceDamping: 25,
      }}
      {...event}
    >
      {label}
    </Root>
  )
}
