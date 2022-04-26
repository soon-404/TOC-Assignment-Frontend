import { Box, Button, styled, Stack } from '@mui/material'
import { ReactNode } from 'react'
import { useStore } from 'hooks/useStore'

const StepCardContainer = styled(Stack)(() => ({
  padding: '16px 0',
  width: '100%',
  height: '100%',
  alignItems: 'center',
}))

const ContentWrapper = styled(Box)(() => ({
  padding: '32px 0',
  width: '100%',
  flex: 1,
  margin: 0,
}))

const ActionZone = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

const StyledButton = styled(Button)(() => ({
  textTransform: 'none',
  borderRadius: 10,
  border: '1px #ffffff solid',
  backgroundColor: '#ffffff',
  color: '#b27bec',
  padding: '4px 16px',
  minWidth: '100px',
  '&:hover': {
    backgroundColor: '#c3c3c3',
    border: '1px #c3c3c3 solid',
  },
}))

type StepCardProps = {
  stepContents: ReactNode[]
  finishText?: string
  disabledNext?: boolean
  onFinish?: () => void
  onNext?: (step: number) => void
  onStepChange?: (step: number) => void
  onFirstStepBack?: () => void
}

export const StepCard = ({
  stepContents,
  finishText,
  disabledNext,
  onFinish,
  onNext,
  onStepChange,
  onFirstStepBack,
}: StepCardProps) => {
  const { activeStep, setActiveStep } = useStore()

  const onBack = () => {
    if (activeStep === 0 && onFirstStepBack) {
      onFirstStepBack()
    } else {
      const nextStep = Math.max(0, activeStep - 1)
      setActiveStep(nextStep)
      if (onStepChange) {
        onStepChange(nextStep)
      }
    }
  }

  const onForward = () => {
    if (activeStep === stepContents.length - 1) {
      if (onFinish) {
        onFinish()
      } else {
        setActiveStep(0)
      }
    } else {
      setActiveStep(activeStep + 1)
      if (onStepChange) {
        onStepChange(activeStep + 1)
      }
      if (onNext) {
        onNext(activeStep)
      }
    }
  }

  return (
    <StepCardContainer>
      <ContentWrapper>{stepContents[activeStep]}</ContentWrapper>
      <ActionZone>
        <StyledButton disabled={activeStep === 0 && !onFirstStepBack} onClick={onBack}>
          Back
        </StyledButton>
        <StyledButton onClick={onForward} disabled={disabledNext}>
          {activeStep === stepContents.length - 1 ? (finishText ? finishText : 'finish') : 'Next'}
        </StyledButton>
      </ActionZone>
    </StepCardContainer>
  )
}
