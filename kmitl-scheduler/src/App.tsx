import { Box, Container, styled } from '@mui/material'
import { DropItem } from 'components/DropItem'
import { Header } from 'components/Header'
import { StepCard } from 'components/StepperCard'

const AppWrapper = styled(Container)(() => ({
  minHeight: '100vh',
  width: 'auto',
}))

export const App = () => {
  return (
    <AppWrapper>
      <Header />
      <StepCard stepContents={[<DropItem />, <Box>pages 2</Box>, <Box>pages 3</Box>]} onFinish={() => {}} />
    </AppWrapper>
  )
}
