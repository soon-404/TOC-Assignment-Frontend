import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Section } from 'types'
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
} from '@mui/material'
import { lightBlue } from '@mui/material/colors'


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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:"center",
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
        width: '40%',
        
         }}
    >
      <Typography sx={{ fontWeight: 'bold' }}>{section && section[0]?.type ? section[0]?.type : 'ทฤษฎี'}</Typography>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        {section.map((element: Section) => (
          <Button
            variant={selectedSection ? (selectedSection.id == element.id ? 'contained' : 'outlined') : 'outlined'}
            key={element.id}
            onClick={() => {
              handleClick(element)
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

const CalculateDate = (start:number,stop:number) => {
  const weekday = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
  let time = ''
  if(start === 0)     time='ไม่ระบุ'
  else
  {
    const Sdate = new Date(start * 1000)
    time += weekday[Sdate.getDay()]+' ' + Sdate.getHours() + ':' 
    if(Sdate.getMinutes()  <10)
      time+='0'
    time += Sdate.getMinutes()
    
    const Edate = new Date(stop * 1000)
    time += ' - ' + Edate.getHours() + ':' 
    if(Edate.getMinutes()  < 10)
      time+='0'
    time += Edate.getMinutes() + ' น.'
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
          <Table sx={{ minWidth: 300 }} aria-label="customized table">
            <TableHead sx={{ backgroundColor: 'white' }}>
              <TableRow>
                <StyledTableCell align="center">
                  {selectedSection?.type || 'ทฤษฎี'} ({selectedSection?.id || 'ไม่ระบุ'})
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="center">
               {(selectedSection?.schedule)? CalculateDate(selectedSection?.schedule[0].start,selectedSection?.schedule[0].end)  : CalculateDate(0,0) }
                <br />
                {(selectedSection?.schedule && selectedSection?.schedule.length > 20)? 
                CalculateDate(selectedSection?.schedule[selectedSection?.schedule.length-1].start,selectedSection?.schedule[selectedSection?.schedule.length-1].end): ''}
                </StyledTableCell>                
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
export default function CustomizedTables({ content ,setSec}: { content: Section[], setSec: (section: Section[]) => void }) {
  const [valueTheory, setValueTheory] = useState<Section>()
  const [valuePractice, setValuePractice] = useState<Section>()
 

  const tempSection: Section = {
    id: '',
    building: '',
    room: '',
    schedule: [{ start: 0, end: 0 }],
    type: '',
  }

  const theoryCourse = content.filter((element: Section) => element?.type === 'ทฤษฎี')
  const practiceCourse = content.filter((element: Section) => element?.type === 'ปฏิบัติ')
 

  const handleClick = (section: Section) => {
    if (section?.type === 'ทฤษฎี') setValueTheory(section)
    else setValuePractice(section)
  }

  useEffect(() => {   
    setValuePractice(practiceCourse[0])
    setValueTheory(theoryCourse[0])
    
  }, [])

  useEffect(() => {   
      setSec([valueTheory? valueTheory:theoryCourse[0] ,valuePractice?valuePractice:practiceCourse[0]])
  }, [valueTheory,valuePractice])

  // if (practiceCourse.length) {
    return (
      <Box display="flex" justifyContent="center" sx={{ marginBlockEnd: '1rem' }}>
        {theoryCourse.length? <SectionTables
          content={theoryCourse}
          handleClick={handleClick}
          selectedSection={valueTheory ? valueTheory : tempSection}
        />:''}
        {practiceCourse.length? <SectionTables
          content={practiceCourse}
          handleClick={handleClick}
          selectedSection={valuePractice ? valuePractice : tempSection}
        />:''}
      </Box>
    )
  
}
