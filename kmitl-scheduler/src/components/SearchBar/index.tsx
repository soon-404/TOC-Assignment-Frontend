import { useEffect, useRef, useState, ChangeEvent, MouseEvent, useMemo, ElementType } from 'react'
import {
  alpha,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputBase,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  SelectChangeEvent,
  SelectProps,
  Stack,
  styled,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useSearch } from 'hooks/useStore'
import { useSearchGroup } from 'hooks/useSearchGroup'
import { CourseType, SortField } from 'types'
import { isMainCourse } from 'utils/course'

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

const StyledSelect = styled((props: SelectProps<SortField>) => (
  <Select {...props} MenuProps={{ PaperProps: { sx: { backgroundColor: 'white', border: '1px solid black' } } }} />
))(() => ({
  backgroundColor: 'white',
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

type SearchBarProps = {
  courseType: CourseType
}

const sortBy: Record<SortField, string> = {
  class_year: 'class year',
  course_type: 'course category',
  id: 'id',
  name: 'name',
}

const SearchBar = ({ courseType }: SearchBarProps) => {
  const { handleSearch, setKeyword: setGlobalKeyword, keyword: globalKeyword } = useSearch()

  const {
    filterCategory: _filterCategory,
    keyword,
    sortField,
    setFilterCategory,
    setKeyword,
    setSortField,
  } = useSearchGroup(globalKeyword)

  const filterCategory = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(_filterCategory).filter(([key, _]) => (courseType === CourseType.Main) === isMainCourse(key)),
      ),
    [_filterCategory],
  )

  const [isFocus, setIsFocus] = useState(false)
  const [popoverEl, setPopoverEl] = useState<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (keyword === '') setGlobalKeyword(keyword)
  }, [keyword])

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)

  const handleChangeSortField = (event: SelectChangeEvent<SortField>) => {
    setSortField(event.target.value as SortField)
  }

  const handleClickInput = (event: MouseEvent<HTMLDivElement>) => {
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
      <Search onChange={handleKeywordChange}>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          ref={inputRef}
          onClick={handleClickInput}
          onBlur={handlePopoverClose}
          value={keyword}
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
      </Search>
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
          <Typography variant="h6">Sort By</Typography>
          <FormControl>
            <InputLabel id="sort-by-label">Sort By</InputLabel>
            <StyledSelect labelId="sort-by-label" label="Sort By" value={sortField} onChange={handleChangeSortField}>
              {Object.keys(sortBy).map((key) => (
                <MenuItem key={key} value={key}>
                  {sortBy[key as SortField]}
                </MenuItem>
              ))}
            </StyledSelect>
          </FormControl>
          <FormGroup>
            <Stack direction="row" alignItems="center" flexWrap="wrap">
              {Object.keys(filterCategory).map((category: string) => (
                <FormControlLabel
                  key={`category-${category}-${courseType}`}
                  control={<Checkbox />}
                  label={category}
                  checked={filterCategory[category]}
                  onChange={() => setFilterCategory((prev) => ({ ...prev, [category]: !prev[category as never] }))}
                />
              ))}
            </Stack>
          </FormGroup>
          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Button
              variant="contained"
              endIcon={<SearchIcon />}
              onClick={async () => await handleSearch(keyword, _filterCategory, sortField)}
            >
              ค้นหา
            </Button>
          </Stack>
        </Stack>
      </Popover>
    </Box>
  )
}

export default SearchBar
