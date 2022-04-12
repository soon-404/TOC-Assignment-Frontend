import { Box, Paper, styled, Typography } from '@mui/material'
import { DropItem } from 'components/DropItem'
import { useStore } from 'hooks/useStore'

const DropItemWrapper = styled(Box)(() => ({
  borderRadius: 20,
  marginBottom: 24,
  overflow: 'hidden',
}))

export const UploadTranscript = () => {
  const { pee } = useStore()

  return (
    <Box>
      <DropItemWrapper>
        <DropItem />
      </DropItemWrapper>
      {!!pee && (
        <Paper>
          <Box mb={2}>
            <Typography variant="body1" color="#ffffff" align="center">
              ชั้นปีที่ x เทอม x
            </Typography>
          </Box>
          <Box mb={1}>
            <Typography variant="body1" color="#ffffff" align="center">
              หน่วยกิจ
            </Typography>
          </Box>
        </Paper>
      )}
    </Box>
  )
}
