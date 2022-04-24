import { createContext, ReactNode, FC, useState, useEffect, SetStateAction, Dispatch } from 'react'
import { courseService } from 'services/course'

interface ISearchContext {
  keyword: string
  setKeyword: Dispatch<SetStateAction<string>>
}

interface SearchProviderProps {
  children: ReactNode
}

export const SearchContext = createContext<ISearchContext>({} as ISearchContext)

export const SearchProvider: FC<SearchProviderProps> = ({ children }) => {
  const [keyword, setKeyword] = useState<string>('')

  const fetchCoursesByKeyword = async () => {
    if (keyword === '') return
    const _courses = await courseService.getCourseByKeyword(keyword)
  }

  const value = {
    keyword,
    setKeyword,
  }

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}
