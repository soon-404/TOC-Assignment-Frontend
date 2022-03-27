import { Box, Stack, styled, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import React from 'react'
import { Pee } from 'types/types'

const Header = styled(Stack)`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

interface Props {
  value: Pee
  setValue: (pee: Pee) => void
}

export const DragableSection: React.FC<Props> = ({ setValue, value }) => {
  return (
    <Box>
      <Header>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">pee</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={value}
            onChange={(e) => setValue(e.target.value as Pee)}
          >
            <MenuItem value={''}>None</MenuItem>
            <MenuItem value={'1'}>1</MenuItem>
            <MenuItem value={'2'}>2</MenuItem>
            <MenuItem value={'3'}>3</MenuItem>
            <MenuItem value={'4'}>4</MenuItem>
          </Select>
        </FormControl>
      </Header>
    </Box>
  )
}
