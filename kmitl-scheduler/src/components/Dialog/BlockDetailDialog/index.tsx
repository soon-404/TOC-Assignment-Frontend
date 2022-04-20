import { useCallback, useMemo, useState } from 'react'
import { Box, Button, IconButton, Typography } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Course, DateRange, Section, CourseWithSection, SectionType } from 'types'
import { useStore } from 'hooks/useStore'
import AlarmAddIcon from '@mui/icons-material/AlarmAdd'
import AutoDeleteIcon from '@mui/icons-material/AutoDelete'
import { CustomizedTables } from 'components/CustomizedTables'
import { insertSectionToWholeCourse } from 'utils/insertSectionToWholeCourse'
import { cloneDeep } from 'lodash'

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
  courseWithSection: CourseWithSection
  from: 'dragzone' | 'dropzone'
}

const CopyableKey: string[] = ['id', 'name'] as CopyableKey[]

export const BlockDetailDialog = ({ courseWithSection, from }: BlockDetailDialogProps) => {
  const { course } = courseWithSection
  const filteredCourseKey: BlockDetailPickOut = course

  const { freeCourses, setFreeCourses, selectedCourses, setSelectedCourses } = useStore()

  const [selectedSectionTheory, _setSelectedSectionTheory] = useState<Section | undefined>(
    courseWithSection.sectionTheory,
  )
  const [selectedSectionPractice, _setSelectedSectionPractice] = useState<Section | undefined>(
    courseWithSection.sectionPractice,
  )

  const setSelectedSectionTheory = (s: Section) => _setSelectedSectionTheory(s)
  const setSelectedSectionPractice = (s: Section) => _setSelectedSectionPractice(s)

  const isSelected = useMemo(
    () => !!selectedCourses.find((_courseWithSection) => _courseWithSection.course?.id === course?.id),
    [selectedCourses, course.id],
  )

  const courseWithSectionLatest = useMemo(
    () => ({
      course,
      sectionPractice: selectedSectionPractice,
      sectionTheory: selectedSectionTheory,
    }),
    [course, selectedSectionPractice, selectedSectionTheory],
  )

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
      setFreeCourses((prev) => {
        const newValue = type === SectionType.Practice ? { sectionPractice: section } : { sectionTheory: section }
        const newArr = cloneDeep(prev)
        newArr[courseIndex] = { ...prev[courseIndex], ...newValue }
        return newArr
      })
    } else if (from === 'dropzone') {
      setSelectedCourses((prev) => {
        const newValue = type === SectionType.Practice ? { sectionPractice: section } : { sectionTheory: section }
        const newArr = cloneDeep(prev)
        newArr[courseIndex] = { ...prev[courseIndex], ...newValue }
        return newArr
      })
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

      {/* Table */}
      <CustomizedTables
        courseWithSection={courseWithSection}
        selectedSectionTheory={selectedSectionTheory}
        selectedSectionPractice={selectedSectionPractice}
        setSelectedSectionTheory={setSelectedSectionTheory}
        setSelectedSectionPractice={setSelectedSectionPractice}
        handleChangeSection={handleChangeSection}
      />

      {/* footer */}
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
        onClick={() =>
          isSelected ? handleRemoveCourse(courseWithSectionLatest) : handleAddCourse(courseWithSectionLatest)
        }
        sx={{ float: 'right', marginTop: '2rem' }}
      >
        {isSelected ? 'remove from schedule' : 'add to schedule'}
      </Button>
    </Box>
  )
}

//  ------------------- note -------------
// 1.กด add ซ้ำๆแล้ว course หาย
// 3. ลากคืน แล้ว sec หาย
// 4. กด remove แล้ว selected course in context หายหมด
