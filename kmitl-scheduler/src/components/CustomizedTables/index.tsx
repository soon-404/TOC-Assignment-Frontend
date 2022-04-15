import { Typography } from '@mui/material'
import { Section } from 'types'

// ******* table *******
import { useState, VoidFunctionComponent } from 'react'
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

function createData(detail: string) {
  return { detail }
}

// ******* Button variants *******
const VariantButtonGroup = ({ section, type,handleClick }: { section: Section[]; type: string ;handleClick: (section: Section,type:string)=>void}): any => {
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        {section.map((element: Section) => (
          <Button
            key={element.id}
            onClick={() => {
              handleClick(element,"P")
            }}
          >
            {element.id}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  )
}

// ******* main *******
export default function CustomizedTables({ content }: SectionTablesProp) {
  const [valueTheory, setValueTheory] = useState<Section>()
  const [valuePractice, setValuePractice] = useState<Section>()

  const theoryCourse = content.filter((element: Section) => element.type === 'ทฤษฎี')

  const handleClick = (section: Section,type:string) => {
    if (type === 'P') setValuePractice(section)
    else setValueTheory(section)
  }

  return <SectionTables content={theoryCourse} handleClick={handleClick} />
}

interface SectionTablesProp {
  content: Section[]
  handleClick: (section: Section,type:string)=>void
}

function SectionTables({ content,handleClick }: SectionTablesProp) {
  const rows = [createData('Frozen yoghurt'), createData('Test data')]

  return (
    <Box>
      <Box display="flex" gap="2rem" justifyContent="center" sx={{ marginBlockEnd: '1rem' }}>
        <Box display="flex" alignItems="center">
          <p>ปฎิบัติ</p>
        </Box>
        <Box>
          <VariantButtonGroup section={content} type="T" handleClick={handleClick}/>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" alignItems="center" sx={{ marginBottom: '1rem' }}>
        <TableContainer component={Paper} sx={{ backgroundColor: 'white' }}>
          <Table sx={{ minWidth: 200 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">
                  {content[0].type} ({content[0].id})
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.detail}>
                  <StyledTableCell align="center">{row.detail}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}
