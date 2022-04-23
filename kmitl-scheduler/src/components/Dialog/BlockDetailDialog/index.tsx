import { useMemo } from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { CourseId, CourseType, DateRange } from 'types'
import { useStore } from 'hooks/useStore'
import AlarmAddIcon from '@mui/icons-material/AlarmAdd'
import AutoDeleteIcon from '@mui/icons-material/AutoDelete'
import { CustomizedTables } from 'components/CustomizedTables'
import { isCourseSelected } from 'utils/course'

interface LineInfoProps {
  id: string
  label: string
  values?: string[] | string
  isCopyable?: boolean
}

const LineInfo = ({ id, label, values, isCopyable }: LineInfoProps) => {
  return (
    <Box display="flex" alignItems="start">
      <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
        {label} :
      </Typography>
      <Typography variant="body2">{typeof values === 'string' ? values : values?.join?.(', ')}</Typography>
      {isCopyable && (
        <IconButton
          onClick={() => {
            let el = document.getElementById(id)
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

interface DateInfoProps {
  type: 'midterm' | 'final'
  values: string | DateRange
}
interface DateInfoLabel {
  midterm: string
  final: string
}

const DateInfo = ({ type, values }: DateInfoProps) => {
  const label: DateInfoLabel = {
    midterm: 'วันสอบกลางภาค',
    final: 'วันสอบปลายภาค',
  }
  const months_th = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ]
  const months_th_mini = [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ต.ค.',
    'พ.ย.',
    'ธ.ค.',
  ]

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1">{label[type as keyof typeof label]} : </Typography>
      <Typography variant="body2">
        {typeof values === 'string'
          ? values
          : new Date(values.start * 1000).getDate() +
            ' ' +
            months_th[new Date(values.start * 1000).getMonth()] +
            ' ' +
            new Date(values.start * 1000).getHours() +
            ':' +
            new Date(values.start * 1000).getMinutes() +
            ' - ' +
            new Date(values.end * 1000).getHours() +
            ':' +
            new Date(values.end * 1000).getMinutes() +
            ' น.'}
      </Typography>
    </Box>
  )
}

interface BlockDetailDialogProps {
  courseId: CourseId
  courseType: CourseType
}

export const BlockDetailDialog = ({ courseId, courseType }: BlockDetailDialogProps) => {
  const { allCourses, addCourse, deleteCourse, selectedCourses } = useStore()
  const { class_year, name, course_type, credit, midterm, final, teacher } = allCourses[courseId]

  const isSelected = useMemo(() => isCourseSelected(courseId, selectedCourses[courseType]), [selectedCourses])

  return (
    <Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginBottom: '1rem' }}>
        <Typography id="courseNameAndId" variant="h6">
          {name} ({courseId})
        </Typography>
        <IconButton
          onClick={() => {
            let el = document.getElementById('courseNameAndId')
            if (el != null) {
              console.log('copy text: ', el.innerHTML)
              navigator.clipboard.writeText(el.innerHTML)
            }
          }}
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="space-between" sx={{ marginBlockEnd: '1rem' }}>
        <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
          ชั้นปีการศึกษา :{class_year}
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
          หมวดวิชา :{course_type}
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
          หน่วยกิต :{credit}
        </Typography>
      </Box>
      <CustomizedTables courseId={courseId} />
      <LineInfo
        id={'teacher'}
        label={'อาจารย์ผู้สอน'}
        values={teacher.length ? teacher : ['ยังไม่ประกาศ']}
        isCopyable={false}
      />
      <DateInfo type={'midterm'} values={midterm || 'ยังไม่ประกาศ'} />
      <DateInfo type={'final'} values={final || 'ยังไม่ประกาศ'} />
      <Button
        variant={isSelected ? 'outlined' : 'contained'}
        startIcon={isSelected ? <AutoDeleteIcon /> : <AlarmAddIcon />}
        onClick={() => (isSelected ? deleteCourse(courseId) : addCourse(courseId))}
        sx={{ float: 'right', marginTop: '2rem' }}
      >
        {isSelected ? 'remove from schedule' : 'add to schedule'}
      </Button>
    </Box>
  )
}
