import { useState } from 'react'
import { Box, Paper, Button, styled, Typography } from '@mui/material'
import { DropItem } from 'components/DropItem'
import { useStore } from 'hooks/useStore'
import { transcriptService } from 'services/transcript'

const DropItemWrapper = styled(Box)(() => ({
  borderRadius: 20,
  marginBottom: 24,
  overflow: 'hidden',
}))

const StyledButton = styled(Button)(() => ({
  textTransform: 'none',
  borderRadius: 10,
  border: '2px #33b60b solid',
  backgroundColor: '#ffffff',
  color: '#3c00ff',
  padding: '4px 16px',
  minWidth: '100px',
  '&:hover, &:focus': {
    backgroundColor: '#c3c3c3',
    border: '2px #c3c3c3 solid',
  },
}))

export const UploadTranscript = () => {
  const { classYear } = useStore()

  const [files, _setFiles] = useState<File[]>([])

  const handleSendTranscript = async () => {
    await transcriptService.sendTranscript(files)
  }

  return (
    <Box>
      <DropItemWrapper>
        <DropItem
          files={files}
          setFiles={(file: File[]) => _setFiles(file)}
          handleSendTranscript={handleSendTranscript}
        />
      </DropItemWrapper>

      {!!classYear && (
        <Paper sx={{ mt: 3 }}>
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
