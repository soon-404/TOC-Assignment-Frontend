import React from 'react'
import { Box } from '@mui/material'
import { DropItem } from 'components/DropItem'
import { Header } from 'components/Header'
import { StepCard } from 'components/StepperCard'

export const Home: React.FC = () => {
  return (
    <Box>
      <Header />
      <StepCard stepContents={[<DropItem />, <Box>pages 2</Box>, <Box>pages 3</Box>]} onFinish={() => {}} />
    </Box>
  )
}
