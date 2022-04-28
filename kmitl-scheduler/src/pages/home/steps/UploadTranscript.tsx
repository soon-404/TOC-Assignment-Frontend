import { useState } from 'react'
import { Box, Paper, Button, styled, Typography, Stack } from '@mui/material'
import { DropItem } from 'components/DropItem'
import { useStore } from 'hooks/useStore'
import { transcriptService } from 'services/transcript'
import { uploadingCategoryMapping } from 'constants'
import { CourseCategory } from 'types'

const DropItemWrapper = styled(Box)(() => ({
  borderRadius: 20,
  marginBottom: 24,
  overflow: 'hidden',
}))

const TextBox = styled(Stack)(() => ({
  flexDirection: 'row',
}))

export const UploadTranscript = () => {
  const { classYear, usedCredit, handleSendTranscript } = useStore()

  const [files, _setFiles] = useState<File[]>([])

  return (
    <Box>
      <DropItemWrapper>
        <DropItem
          files={files}
          setFiles={(file: File[]) => _setFiles(file)}
          handleSendTranscript={async () => await handleSendTranscript(files)}
        />
      </DropItemWrapper>

      {!!classYear && (
        <Paper sx={{ mt: 3 }}>
          <Box mb={2}>
            <Typography variant="body1" color="#ffffff" align="center">
              ชั้นปีที่ {classYear}
            </Typography>
          </Box>
          <Stack alignItems="center" mb={1} px={8}>
            {Object.keys(usedCredit).map((category) => (
              <TextBox key={category}>
                <Box minWidth="200px">
                  <Typography variant="body1" color="#ffffff" align="left">
                    {uploadingCategoryMapping[category as CourseCategory]}
                  </Typography>
                </Box>
                <Typography variant="body1" color="#ffffff" align="left">
                  ใช้ไป
                </Typography>
                <Box minWidth={'4ch'} mx={1}>
                  <Typography variant="body1" color="#ffffff" align="right">
                    {usedCredit[category as never]}
                  </Typography>
                </Box>
                <Typography variant="body1" color="#ffffff" align="left">
                  หน่วยกิจ
                </Typography>
              </TextBox>
            ))}
          </Stack>
        </Paper>
      )}
    </Box>
  )
}
