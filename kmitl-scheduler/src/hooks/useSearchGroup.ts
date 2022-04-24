import { useState, SetStateAction, Dispatch } from 'react'
import { CourseCategoryFilter, SortField } from 'types'

const initialCourseCategoryFilter: CourseCategoryFilter = {
  department: false,
  specific_department: false,
  free: false,
  human: false,
  language: false,
  sciMath: false,
  social: false,
}

export type SearchGroupState = {
  keyword: string
  sortField: SortField
  filterCategory: CourseCategoryFilter
}

export type SearchGroupAction = {
  setKeyword: Dispatch<SetStateAction<string>>
  setSortField: Dispatch<SetStateAction<SortField>>
  setFilterCategory: Dispatch<SetStateAction<CourseCategoryFilter>>
}

export const useSearchGroup = (initialKeyword: string = ''): SearchGroupState & SearchGroupAction => {
  const [keyword, setKeyword] = useState<string>(initialKeyword)
  const [filterCategory, setFilterCategory] = useState<CourseCategoryFilter>({ ...initialCourseCategoryFilter })
  const [sortField, setSortField] = useState<SortField>('name')

  return { keyword, setKeyword, filterCategory, setFilterCategory, sortField, setSortField }
}
