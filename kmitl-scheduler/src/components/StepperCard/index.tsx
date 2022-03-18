import { css } from '@emotion/react'
import { Box, Button, CircularProgress, Paper, styled, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { useStore } from 'hooks/useStore'

const StepCardContainer = styled(Paper)<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? '100%' : '782px')};
  border-radius: 20px;
  background-color: rgba(13, 19, 27, 0.7);
  box-shadow: 0 16px 32px 0 rgba(0, 0, 0, 0.05);
`

const LoadingProgress = styled(CircularProgress)`
  height: 20px !important;
  width: 20px !important;
  color: #676767;
  margin-right: 10px;
`

type Props = {
  steps: string[]
  onStepChange?: (step: number) => void
  onFinish: () => void
  onNext?: (val: number) => void
  stepContents: React.ReactNode[]
  finishText?: string
  onFirstStepBack?: () => void
  onSecondary?: () => void
  showSecondary?: boolean
  secondaryText?: string
  isWaitingTransaction?: boolean
}

export const StepCard = ({
  steps,
  onStepChange,
  onFinish,
  stepContents,
  onNext,
  finishText,
  onFirstStepBack,
  onSecondary,
  showSecondary = false,
  secondaryText,
  isWaitingTransaction = false,
}: Props) => {
  const theme = useTheme()
  const downSm = useMediaQuery(theme.breakpoints.down('sm'))
  const { activeStep, setActiveStep } = useStore()

  return (
    <StepCardContainer isMobile={downSm}>
      <Box flex={1} padding={downSm ? 2 : 5} display="flex" flexDirection="column" justifyContent="space-between">
        <Box flex={1}>{stepContents[activeStep]}</Box>
        <Box display="flex" justifyContent="space-between" marginTop={downSm ? 4 : 0}>
          <Button
            css={css`
              margin-right: 16px;
              max-width: 120px;
            `}
            disabled={activeStep === 0 && !onFirstStepBack}
            onClick={() => {
              if (activeStep === 0 && onFirstStepBack) {
                onFirstStepBack()
              } else {
                const nextStep = Math.max(0, activeStep - 1)
                setActiveStep(nextStep)
                if (onStepChange) {
                  onStepChange(nextStep)
                }
              }
            }}
          >
            Back
          </Button>
          <Box>
            {activeStep === steps.length - 1 && showSecondary && (
              <Button
                variant="outlined"
                css={css`
                  margin-left: 16px;
                  max-width: 140px;
                `}
                onClick={onSecondary}
              >
                {secondaryText}
              </Button>
            )}
            <Button
              variant="outlined"
              css={css`
                margin-left: 16px;
                max-width: 140px;
              `}
              onClick={() => {
                if (activeStep === steps.length - 1) {
                  onFinish()
                } else {
                  setActiveStep(activeStep + 1)
                  if (onStepChange) {
                    onStepChange(activeStep + 1)
                  }
                  if (onNext) {
                    onNext(activeStep)
                  }
                }
              }}
            >
              {isWaitingTransaction && <LoadingProgress />}
              {activeStep === steps.length - 1 ? (finishText ? finishText : 'Confirm') : 'Next'}
            </Button>
          </Box>
        </Box>
      </Box>
    </StepCardContainer>
  )
}
