import React from 'react'
import { Box, Typography, styled, Theme } from '@mui/material'
import { SchedulerStepper } from 'components/Stepper'

const StyledHeader = styled(Box)<{ theme?: Theme }>(({ theme }) => ({
  backgroundColor: 'red',
  padding: theme.spacing(4),
  marginBottom: theme.spacing(8),
}))

export const Header = () => {
  return (
    <StyledHeader>
      <Typography variant="h4" align="center">
        จะจบเมื่อไหร่ซิ
      </Typography>
      <SchedulerStepper />
    </StyledHeader>
  )
}
