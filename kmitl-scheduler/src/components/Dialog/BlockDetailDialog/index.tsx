import { Box, Button, IconButton, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Course, DateRange } from 'types'
import { useStore } from 'hooks/useStore'
import AlarmAddIcon from '@mui/icons-material/AlarmAdd'
import AutoDeleteIcon from '@mui/icons-material/AutoDelete'
interface LineInfoProps {
  key: string
  label: string
  values?: string[] | string
  isCopyable?: boolean
}

const LineInfo = ({ key, label, values, isCopyable }: LineInfoProps) => {
  return (
    <Box display="flex" alignItems="start">
      <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
        {label} :
      </Typography>
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
  // console.log(type, values)
  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1">{label[type as keyof typeof label]} :</Typography>
      <Typography variant="body2">
        {typeof values === 'string'
          ? values
          : new Date(values.start * 1000).getHours() +
            ':' +
            new Date(values.start * 1000).getMinutes() +
            ' - ' +
            new Date(values.end * 1000).getHours() +
            ':' +
            new Date(values.end * 1000).getMinutes()}
      </Typography>
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
  const { freeCourses, setFreeCourses, selectedCourses, setSelectedCourses } = useStore()

  const filteredCourseKey: BlockDetailPickOut = course

  const isSelected = (courseId: string) => {
    const target = selectedCourses.find((course) => course.id == courseId)
    return target ? true : false
  }

  function editSchedule() {
    if (isSelected(course.id)) {
      const leftedBlocks = selectedCourses.filter((selectedCourse) => selectedCourse.id !== course.id)
      setSelectedCourses([...leftedBlocks])
      setFreeCourses((prev) => [...prev, course])
    } else {
      const leftedBlocks = freeCourses.filter((freeCourse) => freeCourse.id !== course.id)
      setFreeCourses([...leftedBlocks])
      setSelectedCourses((prev) => [...prev, course])
    }
  }

  return (
    <Box>
      {/* head */}
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginBottom: '1rem' }}>
        <Typography id="courseNameAndId" variant="h6">
          {course.name} ({course.id})
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
          ชั้นปีการศึกษา :{course.class_year}
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
          หมวดวิชา :{course.course_type}
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: 'nowrap' }}>
          หน่วยกิต :{course.credit}
        </Typography>
      </Box>
      {/* Table */}
      {/* use data in course.section */}

      <Typography variant="h1">table</Typography>

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
      <LineInfo
        key={'teacher'}
        label={'อาจารย์ผู้สอน'}
        values={filteredCourseKey['teacher'].length ? filteredCourseKey['teacher'] : ['ยังไม่ประกาศ']}
        isCopyable={false}
      />

      <DateInfo type={'midterm'} values={course.midterm || 'ยังไม่ประกาศ'} />
      <DateInfo type={'final'} values={course.final || 'ยังไม่ประกาศ'} />

      <Button
        variant={isSelected(course.id) ? 'outlined' : 'contained'}
        startIcon={isSelected(course.id) ? <AutoDeleteIcon /> : <AlarmAddIcon />}
        onClick={editSchedule}
        sx={{ float: 'right', marginTop: '2rem' }}
      >
        {isSelected(course.id) ? 'remove from schedule' : 'add to schedule'}
      </Button>
    </Box>
  )
}
