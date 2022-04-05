import { styled } from '@mui/system'
import { motion } from 'framer-motion'

export const Block = styled(motion.div)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100px',
  height: '100px',
  borderRadius: '20px',
  color: 'white',
  zIndex: '1',
}))
