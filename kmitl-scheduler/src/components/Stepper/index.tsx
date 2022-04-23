import { FC } from 'react'
import { Step, StepButton, Stepper, styled, Typography } from '@mui/material'
import { useStore } from 'hooks/useStore'

const steps = ['step 1', 'something 2', 'lorem 3', 'alcohol 4']

const StyledStepper = styled(Stepper)(() => ({
  padding: '24px 0',
}))

const StyledStepButton = styled(StepButton)(() => ({
  color: 'inherit',
}))

const ButtonTypography = styled(Typography)(() => ({
  color: 'white',
  fontWeight: 400,
  '.Mui-active > &': {
    fontWeight: 600,
    color: 'yellow',
  },
}))

export const SchedulerStepper: FC = () => {
  const { activeStep, setActiveStep } = useStore()

  return (
    <StyledStepper nonLinear activeStep={activeStep}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StyledStepButton disableRipple disableTouchRipple onClick={() => setActiveStep(index)}>
            <ButtonTypography variant="body2">{label}</ButtonTypography>
          </StyledStepButton>
        </Step>
      ))}
    </StyledStepper>
  )
}
