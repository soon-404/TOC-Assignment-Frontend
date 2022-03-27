import React from 'react'
import { Step, StepButton, Stepper } from '@mui/material'
import { useStore } from 'hooks/useStore'

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad']

export const SchedulerStepper: React.FC = () => {
  const { activeStep, setActiveStep } = useStore()

  return (
    <Stepper nonLinear activeStep={activeStep}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepButton color="inherit" onClick={() => setActiveStep(index)}>
            {label}
          </StepButton>
        </Step>
      ))}
    </Stepper>
  )
}
