import { useCallback, useMemo, useState } from 'react'
import { Course, Section, SectionType } from 'types'
import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  ButtonGroup,
  Box,
  Typography,
} from '@mui/material'
import { lightBlue } from '@mui/material/colors'
import { CalculateDate } from 'utils/calculateDate'
import { CourseWithSection } from 'types'

const RootVariantButtonGroup = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  '& > *': {
    m: 1,
  },
  width: '40%',
}))

// ******* table *******
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: lightBlue[800],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 10,
  },
}))

// ******* Button variants *****
type VariantButtonGroupProps = {
  courseId: string
  section: Section[]
  type: SectionType
  selectedSection?: Section
  handleClick: (section: Section) => void
}

const VariantButtonGroup = ({ courseId, section, selectedSection, handleClick, type }: VariantButtonGroupProps) => {
  return (
    <RootVariantButtonGroup>
      <Typography sx={{ fontWeight: 'bold' }}>{type}</Typography>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        {section.map((element: Section, i) => (
          <Button
            key={`${element.id}-${courseId}-${i}`}
            variant={selectedSection!.id === element.id ? 'contained' : 'outlined'}
            onClick={() => handleClick(element)}
          >
            {element.id === '' ? 'ไม่ระบุ' : element.id}
          </Button>
        ))}
      </ButtonGroup>
    </RootVariantButtonGroup>
  )
}

type SectionTablesProp = {
  courseId: string
  content: Section[]
  selectedSection?: Section
  type: SectionType
  handleClick: (section: Section) => void
}

export const SectionTables = ({ courseId, content, selectedSection, handleClick, type }: SectionTablesProp) => {
  const room = useMemo(() => {
    if (selectedSection?.room) return selectedSection.room
    if (selectedSection?.building) return selectedSection.building

    return 'ไม่ระบุ'
  }, [selectedSection])

  return (
    <Box>
      <Box display="flex" gap="2rem" justifyContent="center" sx={{ marginBlockEnd: '1rem' }}>
        <VariantButtonGroup
          courseId={courseId}
          section={content}
          selectedSection={selectedSection}
          handleClick={handleClick}
          type={type}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginBottom: '1rem' }}>
        <TableContainer component={Paper} sx={{ backgroundColor: 'white' }}>
          <Table sx={{ minWidth: 300 }} aria-label="customized table">
            <TableHead sx={{ backgroundColor: 'white' }}>
              <TableRow>
                <StyledTableCell align="center">
                  {type} ({selectedSection!.id || 'ไม่ระบุ'})
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="center">
                  {selectedSection!.schedule.length !== 0
                    ? CalculateDate(selectedSection!.schedule[0].start, selectedSection!.schedule[0].end)
                    : null}
                  <br />
                  {selectedSection!.schedule.length > 20
                    ? CalculateDate(
                        selectedSection!.schedule[selectedSection!.schedule.length - 1].start,
                        selectedSection!.schedule[selectedSection!.schedule.length - 1].end,
                      )
                    : null}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="center">{room}</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

// ******* main *******
type CustomizedTables = {
  courseWithSection: CourseWithSection
  handleChangeSection: (courseId: string, section: Section, type: SectionType) => void
}
export const CustomizedTables = ({
  courseWithSection: { course, sectionPractice: selectedSectionPractice, sectionTheory: selectedSectionTheory },
  handleChangeSection,
}: CustomizedTables) => {
  const { theorySection, practiceSection } = useMemo(() => {
    const theorySection = course.section.filter((s) => s.type === SectionType.Theory)
    const practiceSection = course.section.filter((s) => s.type === SectionType.Practice)

    return { theorySection, practiceSection }
  }, [course])

  const handleClickTheory = useCallback(
    (section: Section) => handleChangeSection(course.id, section, SectionType.Theory),
    [course.id],
  )

  const handleClickPractice = useCallback(
    (section: Section) => handleChangeSection(course.id, section, SectionType.Practice),
    [course.id],
  )

  return (
    <Box display="flex" justifyContent="center" sx={{ marginBlockEnd: '1rem' }}>
      {!!theorySection.length && selectedSectionTheory && (
        <SectionTables
          courseId={course.id}
          content={theorySection}
          handleClick={handleClickTheory}
          selectedSection={selectedSectionTheory}
          type={SectionType.Theory}
        />
      )}
      {!!practiceSection.length && selectedSectionPractice && (
        <SectionTables
          courseId={course.id}
          content={practiceSection}
          handleClick={handleClickPractice}
          selectedSection={selectedSectionPractice}
          type={SectionType.Practice}
        />
      )}
    </Box>
  )
}
