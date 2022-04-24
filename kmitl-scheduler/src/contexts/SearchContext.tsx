import { createContext, ReactNode, FC, useState, SetStateAction, Dispatch } from 'react'

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

  const value = {
    keyword,
    setKeyword,
  }

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
}
