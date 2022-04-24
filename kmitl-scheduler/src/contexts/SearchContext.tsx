import { SearchGroupAction, SearchGroupState, useSearchGroup } from 'hooks/useSearchGroup'
import { useStore } from 'hooks/useStore'
import { createContext, ReactNode, FC, useEffect } from 'react'
import { courseService } from 'services/course'
import { Course, CourseCategoryFilter, SortField } from 'types'

interface ISearchContext extends SearchGroupState, SearchGroupAction {
  handleSearch: (keyword: string, filterCategory: CourseCategoryFilter, sortField: SortField) => Promise<void>
}

interface SearchProviderProps {
  children: ReactNode
}

export const SearchContext = createContext<ISearchContext>({} as ISearchContext)

export const SearchProvider: FC<SearchProviderProps> = ({ children }) => {
  const { initExternalCourse, classYear } = useStore()

  const { setFilterCategory, setKeyword, setSortField, ...restValue } = useSearchGroup()

  const handleSearch = async (keyword: string, filterCategory: CourseCategoryFilter, sortField: SortField) => {
    setKeyword(keyword)
    setFilterCategory(filterCategory)
    setSortField(sortField)

    if (!classYear) return

    let _courses: Course[]
    if (keyword === '') {
      _courses = await courseService.getCurrentSort(sortField, classYear)
    } else {
      _courses = await courseService.getCourseByKeyword(keyword, sortField)
    }

    initExternalCourse(_courses)
  }

  // * For log
  //   useEffect(() => {
  //     console.log('SearchContext', restValue.keyword, restValue.filterCategory, restValue.sortField)
  //   }, [restValue.keyword, restValue.filterCategory, restValue.sortField])

  const value = {
    setKeyword,
    setSortField,
    setFilterCategory,
    handleSearch,
    ...restValue,
  }

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}
