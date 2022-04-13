import { Box, Button, IconButton, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Course } from 'types'
import { useStore } from 'hooks/useStore'

interface LineInfoProps {
  key: string
  label: string
  values?: string[] | string
  isCopyable?: boolean
}

const LineInfo = ({ key, label, values, isCopyable }: LineInfoProps) => {
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1">{label} :</Typography>
      <Typography variant="body2">{typeof values === 'string' ? values : values?.join?.(', ')}</Typography>
      {isCopyable && (
        <IconButton
          onClick={() => {
            let el = document.getElementById(key)
            if (el != null) {
              // set copy logic
            }
          }}
        >
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
      {/* head */}
      <Typography variant="h6">{course.name}</Typography>

      {/* Table */}
      {/* use data in course.section */}

      {/* footer */}
      {/* caution bug at onClick */}
      {/* {Object.keys(filteredCourseKey).map((key: string) => (
        <LineInfo
          key={key}
          label={key}
          values={filteredCourseKey[key as KeyOfBlockDetailPickOut]}
          isCopyable={CopyableKey.includes(key)}
        />
      ))} */}
      <Button variant="contained" onClick={() => setSelectedCourses((prev) => [...prev, course])}>
        add to schedule
      </Button>
    </Box>
  )
}
