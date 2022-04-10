import { Box, Button, IconButton, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Course } from 'types'
import { useStore } from 'hooks/useStore'

interface LineInfoProps {
  label: string
  values?: string[] | string
  isCopyable?: boolean
}

const LineInfo = ({ label, values, isCopyable }: LineInfoProps) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1" color="#ffffff">
        {label} :
      </Typography>
      <Typography variant="body2" color="#ffffff">
        {typeof values === 'string' ? values : values?.join?.(', ')}
      </Typography>
      {isCopyable && (
        <IconButton>
          <ContentCopyIcon />
        </IconButton>
      )}
    </Box>
  )
}

type BlockDetailPickOut = Omit<Course, 'midterm' | 'final' | 'section'>
type KeyOfBlockDetailPickOut = keyof BlockDetailPickOut
type CopyableKey = Extract<KeyOfBlockDetailPickOut, 'id' | 'name'>

interface BlockDetailDialogProps {
  course: Course
}

const CopyableKey: string[] = ['id', 'name'] as CopyableKey[]

export const BlockDetailDialog = ({ course }: BlockDetailDialogProps) => {
  const { setSelectedCourses } = useStore()

  const filteredCourseKey: BlockDetailPickOut = course

  return (
    <Box>
      <Typography variant="h6">คณิตศาสตร์</Typography>
      {Object.keys(filteredCourseKey).map((key: string) => (
        <LineInfo
          key={key}
          label={key}
          values={filteredCourseKey[key as KeyOfBlockDetailPickOut]}
          isCopyable={CopyableKey.includes(key)}
        />
      ))}
      <Button variant="contained" onClick={() => setSelectedCourses((prev) => [...prev, course])}>
        add to schedule
      </Button>
    </Box>
  )
}
