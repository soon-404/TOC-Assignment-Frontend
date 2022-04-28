import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import { SchedulerStepper } from 'components/Stepper'

const StyledHeader = styled(Box)(() => ({
  width: '100%',
  paddingTop: 16,
}))

const TypographyWrapper = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  paddingBottom: 16,
}))

export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <TypographyWrapper>
        <Typography variant="h3" color="#fff" align="center" sx={{ fontWeight: 600 }}>
          KMITL Scheduler
        </Typography>
      </TypographyWrapper>
      <Box width="100%">
        <SchedulerStepper />
      </Box>
    </StyledHeader>
  )
}
