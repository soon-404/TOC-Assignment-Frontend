import React from 'react'
import { Box, Container, styled } from '@mui/material'
import { AnimateSharedLayout } from 'framer-motion'

import { Header } from 'components/Header'
import { StepCard } from 'components/StepperCard'

import { UploadTranscript } from 'pages/home/steps/UploadTranscript'
import { MajorSchedule } from 'pages/home/steps/MajorSchedule'
import { MinorSchedule } from 'pages/home/steps/MinorSchedule'
import { Conclude } from 'pages/home/steps/Conclude'
import { useStore } from 'hooks/useStore'

const HomeContainer = styled(Container)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
}))

const StepCardWrapper = styled(Box)(() => ({
  flex: 1,
  width: '100%',
}))

export const Home = () => {
  const { classYear } = useStore()

  return (
    <AnimateSharedLayout>
      <HomeContainer>
        <Header />
        <StepCardWrapper>
          <StepCard
            disabledNext={!classYear}
            stepContents={[
              // * Step
              <UploadTranscript />,
              <MajorSchedule />,
              <MinorSchedule />,
              <Conclude />,
            ]}
          />
        </StepCardWrapper>
      </HomeContainer>
    </AnimateSharedLayout>
  )
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
