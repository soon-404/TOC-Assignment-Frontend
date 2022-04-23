import { useMemo } from 'react'
import { CourseId, Section, SectionType } from 'types'
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
import { useStore } from 'hooks/useStore'

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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: lightBlue[800],
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(() => ({
  '&:last-child td, &:last-child th': {
    border: 10,
  },
}))

type SectionTablesProp = {
  courseId: string
  section: Section[]
  selectedSection: Section
  sectionType: SectionType
}

const VariantButtonGroup = ({ courseId, section, selectedSection, sectionType }: SectionTablesProp) => {
  const { setSection } = useStore()

  return (
    <RootVariantButtonGroup>
      <Typography sx={{ fontWeight: 'bold' }}>{sectionType}</Typography>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        {section.map((section: Section, idx: number) => (
          <Button
            key={`${section.id}-${courseId}-${idx}`}
            variant={selectedSection.id === section.id ? 'contained' : 'outlined'}
            onClick={() => setSection(courseId, section, sectionType)}
          >
            {section.id === '' ? 'ไม่ระบุ' : section.id}
          </Button>
        ))}
      </ButtonGroup>
    </RootVariantButtonGroup>
  )
}

export const SectionTables = ({ courseId, section, selectedSection, sectionType }: SectionTablesProp) => {
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
          section={section}
          selectedSection={selectedSection}
          sectionType={sectionType}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginBottom: '1rem' }}>
        <TableContainer component={Paper} sx={{ backgroundColor: 'white' }}>
          <Table sx={{ minWidth: 300 }} aria-label="customized table">
            <TableHead sx={{ backgroundColor: 'white' }}>
              <TableRow>
                <StyledTableCell align="center">
                  {sectionType} ({selectedSection!.id || 'ไม่ระบุ'})
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

type CustomizedTablesProps = {
  courseId: CourseId
}

export const CustomizedTables = ({ courseId }: CustomizedTablesProps) => {
  const { allCourses, sectionMapping } = useStore()

  const { theorySections, practiceSections } = useMemo(() => {
    const theorySections = allCourses[courseId].section.filter((section) => section.type === SectionType.Theory)
    const practiceSections = allCourses[courseId].section.filter((section) => section.type === SectionType.Practice)
    return { theorySections, practiceSections }
  }, [allCourses])

  const selectedTheorySection = sectionMapping[courseId][SectionType.Theory]
  const selectedPracticeSection = sectionMapping[courseId][SectionType.Practice]
  return (
    <Box display="flex" justifyContent="center" sx={{ marginBlockEnd: '1rem' }}>
      {!!theorySections.length && !!selectedTheorySection && (
        <SectionTables
          courseId={courseId}
          section={theorySections}
          selectedSection={selectedTheorySection}
          sectionType={SectionType.Theory}
        />
      )}
      {!!practiceSections.length && !!selectedPracticeSection && (
        <SectionTables
          courseId={courseId}
          section={practiceSections}
          selectedSection={selectedPracticeSection}
          sectionType={SectionType.Practice}
        />
      )}
    </Box>
  )
}
