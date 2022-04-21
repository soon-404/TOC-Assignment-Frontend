import { useCallback, useMemo, useState } from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Course, DateRange, Section, CourseWithSection, SectionType } from 'types'
import { useStore } from 'hooks/useStore'
import AlarmAddIcon from '@mui/icons-material/AlarmAdd'
import AutoDeleteIcon from '@mui/icons-material/AutoDelete'
import { CustomizedTables } from 'components/CustomizedTables'
import { insertSectionToWholeCourse } from 'utils/insertSectionToWholeCourse'

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

type BlockDetailPickOut = Omit<Course, 'midterm' | 'final' | 'section'>
type KeyOfBlockDetailPickOut = keyof BlockDetailPickOut
type CopyableKey = Extract<KeyOfBlockDetailPickOut, 'id' | 'name'>

interface BlockDetailDialogProps {
  courseId: Course['id']
  from: 'dragzone' | 'dropzone'
}

const CopyableKey: string[] = ['id', 'name'] as CopyableKey[]

export const BlockDetailDialog = ({ courseId, from }: BlockDetailDialogProps) => {
  const { freeCourses, setFreeCourses, selectedCourses, setSelectedCourses } = useStore()

  const { courseWithSection, isSelected } = useMemo(() => {
    let courseWithSection: CourseWithSection | undefined

    courseWithSection = freeCourses.find(({ course }) => course.id === courseId)
    if (courseWithSection) return { courseWithSection, isSelected: false }
    courseWithSection = selectedCourses.find(({ course }) => course.id === courseId)
    if (courseWithSection) return { courseWithSection, isSelected: true }

    throw new TypeError('_courseWithSection is undefined')
  }, [freeCourses, selectedCourses, from])

  const { course } = courseWithSection
  const filteredCourseKey: BlockDetailPickOut = courseWithSection.course

  const handleAddCourse = useCallback(
    (courseWithSection: CourseWithSection) => {
      const leftedBlocks = freeCourses.filter(({ course }) => course.id !== courseWithSection.course.id)
      setFreeCourses([...leftedBlocks])
      setSelectedCourses((prev) => [...prev, courseWithSection])
    },
    [freeCourses, setFreeCourses, setSelectedCourses],
  )

  const handleRemoveCourse = useCallback(
    (courseWithSection: CourseWithSection) => {
      const leftedBlocks = selectedCourses.filter(({ course }) => course.id !== courseWithSection.course.id)
      setSelectedCourses([...leftedBlocks])
      setFreeCourses((prev) => [...prev, courseWithSection])
    },
    [selectedCourses, setFreeCourses, setSelectedCourses],
  )

  const handleChangeSection = (courseId: string, section: Section, type: SectionType) => {
    const courseIndex = (from === 'dragzone' ? freeCourses : selectedCourses).findIndex(
      (courseWithSection) => courseWithSection.course.id === courseId,
    )

    if (courseIndex < 0) return

    if (from === 'dragzone') {
      setFreeCourses((prev) => insertSectionToWholeCourse(courseIndex, section, prev, type))
    } else if (from === 'dropzone') {
      setSelectedCourses((prev) => insertSectionToWholeCourse(courseIndex, section, prev, type))
    }
  }

  return (
    <Box>
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
      <CustomizedTables courseWithSection={courseWithSection} handleChangeSection={handleChangeSection} />
      <LineInfo
        id={'teacher'}
        label={'อาจารย์ผู้สอน'}
        values={filteredCourseKey['teacher'].length ? filteredCourseKey['teacher'] : ['ยังไม่ประกาศ']}
        isCopyable={false}
      />
      <DateInfo type={'midterm'} values={course.midterm || 'ยังไม่ประกาศ'} />
      <DateInfo type={'final'} values={course.final || 'ยังไม่ประกาศ'} />
      <Button
        variant={isSelected ? 'outlined' : 'contained'}
        startIcon={isSelected ? <AutoDeleteIcon /> : <AlarmAddIcon />}
        onClick={() => (isSelected ? handleRemoveCourse(courseWithSection) : handleAddCourse(courseWithSection))}
        sx={{ float: 'right', marginTop: '2rem' }}
      >
        {isSelected ? 'remove from schedule' : 'add to schedule'}
      </Button>
    </Box>
  )
}
