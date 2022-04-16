import { Typography } from '@mui/material'
import { Section, DateRange } from 'types'

// ******* table *******
import { useEffect, useState, VoidFunctionComponent } from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Build } from '@mui/icons-material'
// ******* Button variants *******
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box'

// ******* Button variants *******
const VariantButtonGroup = ({
  section,
  selectedSection,
  handleClick,
}: {
  section: Section[]
  selectedSection?: Section
  handleClick: (section: Section) => void
}): any => {
  console.log('In VariantButtonGroup section is =>', section)
  console.log('In VariantButtonGroup select is =>', selectedSection)
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
        width: '40%',
        justifyContent: 'space-between',
      }}
    >
      <Typography sx={{ fontWeight: 'bold' }}>{section && section[0]?.type ? section[0]?.type : 'ทฤษฎี'}</Typography>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        {section.map((element: Section) => (
          <Button
            variant={selectedSection ? (selectedSection.id == element.id ? 'contained' : 'outlined') : 'outlined'}
            key={element.id}
            onClick={() => {
              if (element.schedule.length) handleClick(element)
            }}
          >
            {element.id === '' ? 'ไม่ระบุ' : element.id}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  )
}

// ******* table *******
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
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

const CalculateDate = (values: DateRange[]) => {
  const weekday = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
  let time = ''
  if(values[0].start === 0)     time='ไม่ระบุ'
  else
  {
    
    const Sdate = new Date(values[0].start * 1000)
    time += weekday[Sdate.getDay()]+' ' + Sdate.getHours() + ':' + Sdate.getMinutes()  
 
    const Edate = new Date(values[0].end * 1000)
    time += ' - ' + Edate.getHours() + ':' + Edate.getMinutes() + ' น.'
  
    if(values.length>20)
    { 
      const SsecondDate = new Date(values[21].start * 1000)
      time += weekday[SsecondDate.getDay()]+ ' ' + SsecondDate.getHours() + ':' + SsecondDate.getMinutes()
    
      const EsecondDate = new Date(values[21].end * 1000)
      time += ' - ' + EsecondDate.getHours() + ':' + EsecondDate.getMinutes() + ' น.'
    }
  }

  return time
}

interface SectionTablesProp {
  content: Section[]
  selectedSection?: Section
  handleClick: (section: Section) => void
}

function SectionTables({ content, selectedSection, handleClick }: SectionTablesProp) {
  return (
    <Box>
      <Box display="flex" gap="2rem" justifyContent="center" sx={{ marginBlockEnd: '1rem' }}>
        <VariantButtonGroup section={content} selectedSection={selectedSection} handleClick={handleClick} />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginBottom: '1rem' }}>
        <TableContainer component={Paper} sx={{ backgroundColor: 'white' }}>
          <Table sx={{ minWidth: 200 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">
                  {selectedSection?.type || 'ทฤษฎี'} ({selectedSection?.id || 'ไม่ระบุ'})
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="center">
                {selectedSection?.schedule? CalculateDate(selectedSection?.schedule): CalculateDate([{ start: 0, end: 0 }]) }
                </StyledTableCell>
                {/* <StyledTableCell align="center">
                  {selectedSection?.schedule ? selectedSection.schedule.length : selectedSection}
                </StyledTableCell> */}
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell align="center">
                  {selectedSection?.room
                    ? selectedSection.room
                    : selectedSection?.building
                    ? selectedSection.building
                    : 'ไม่ระบุ'}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}

// ******* main *******
export default function CustomizedTables({ content }: { content: Section[] }) {
  const [valueTheory, setValueTheory] = useState<Section>()
  const [valuePractice, setValuePractice] = useState<Section>()
  console.log('--------------------------------------------------')
  console.log('content in CustomizedTables  =  ', content)

  const tempSection: Section = {
    id: '',
    building: '',
    room: '',
    schedule: [{ start: 0, end: 0 }],
    type: '',
  }

  const theoryCourse = content.filter((element: Section) => element.type === 'ทฤษฎี')
  const practiceCourse = content.filter((element: Section) => element.type === 'ปฏิบัติ')
  console.log('theoryCourse in CustomizedTables  =  ', theoryCourse)
  console.log('practiceCourse in CustomizedTables  =  ', practiceCourse)

  const handleClick = (section: Section) => {
    if (section?.type === 'ทฤษฎี') setValueTheory(section)
    else setValuePractice(section)
  }

  useEffect(() => {
    setValuePractice(practiceCourse[0])
    setValueTheory(theoryCourse[0])
    console.log('valueTheory', valueTheory)
    console.log('valuePractice', valuePractice)
    console.log('set up finish')
  }, [])

  if (practiceCourse.length) {
    return (
      <div>
        <SectionTables
          content={theoryCourse}
          handleClick={handleClick}
          selectedSection={valueTheory ? valueTheory : tempSection}
        />
        <SectionTables
          content={practiceCourse}
          handleClick={handleClick}
          selectedSection={valuePractice ? valuePractice : tempSection}
        />
      </div>
    )
  } else {
    return (
      <SectionTables
        content={theoryCourse}
        handleClick={handleClick}
        selectedSection={valueTheory ? valueTheory : tempSection}
      />
    )
  }
}
