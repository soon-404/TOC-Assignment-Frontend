import React, { useEffect, useRef, useState } from 'react'
import {
  alpha,
  Box,
  Container,
  FormControl,
  InputBase,
  InputLabel,
  Menu,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { makeStyles } from '@mui/styles'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.35),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.45),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}))

const useStyles = makeStyles({
  menu: {
    '& .MuiPaper-root': {
      backgroundColor: 'white',
    },
  },
})

interface SearchBarProps {}

const SearchBar: React.FC<SearchBarProps> = () => {
  const classes = useStyles()
  const [isFocus, setIsFocus] = useState(false)
  const [sortByValue, setSortByValue] = useState<'1' | '2' | '3'>('1')
  const [popoverEl, setPopoverEl] = useState<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSortChange = (event: SelectChangeEvent) => {
    setSortByValue(event.target.value as any) // Interface later
  }

  const handleSearching = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsFocus(true)
    setPopoverEl(event.currentTarget)
  }

  const handlePopoverClose = (event: any) => {
    if (isClickInSidePopover(event)) return
    setPopoverEl(null)
    setIsFocus(false)
  }

  const isClickInSidePopover = (event: MouseEvent): boolean | null =>
    popoverEl && popoverEl.contains(event.target as Node)

  useEffect(() => {
    if (isFocus) inputRef.current?.focus()
  }, [isFocus])

  return (
    <Box>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          ref={inputRef}
          onClick={handleSearching}
          onBlur={handlePopoverClose}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
        <Popover
          id="search-popover"
          disableAutoFocus
          open={isFocus}
          anchorEl={popoverEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            style: {
              maxHeight: '50vh',
              width: '100%',
              backgroundColor: 'white',
            },
          }}
          sx={{ maxWidth: '1000px' }}
        >
          <Stack spacing={4}>
            <Typography variant="h6">เรียงจาก</Typography>
            <FormControl>
              <InputLabel id="sort-by-label">เรียงจาก</InputLabel>
              <Select
                className={classes.menu}
                labelId="sort-by-label"
                value={sortByValue}
                label="เรียงจาก"
                onChange={handleSortChange}
              >
                <MenuItem value={'1'}>Ten</MenuItem>
                <MenuItem value={'2'}>Twenty</MenuItem>
                <MenuItem value={'3'}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="h6">กรองจาก</Typography>
            <Stack direction="row" alignItems="center" flexWrap="wrap">
              <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
              <FormControlLabel control={<Checkbox />} label="Disabled" />
            </Stack>
            <Stack direction="row" justifyContent="flex-end" alignItems="center">
              <Button variant="contained" endIcon={<SearchIcon />}>
                ค้นหา
              </Button>
            </Stack>
          </Stack>
        </Popover>
      </Search>
    </Box>
  )
}

export default SearchBar
