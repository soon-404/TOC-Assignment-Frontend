import React from 'react'
import { Box, Typography, styled } from '@mui/material'
import { SchedulerStepper } from 'components/Stepper'

const StyledHeader = styled(Box)`
  padding: 32px;
  margin-bottom: 64px;
`

export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Typography variant="h4" align="center">
        จะจบเมื่อไหร่ซิ
      </Typography>
      <SchedulerStepper />
    </StyledHeader>
  )
}
