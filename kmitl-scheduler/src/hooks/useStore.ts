import { StoreContext } from 'contexts/StoreContext'
import { useContext } from 'react'

export const useStore = () => {
  return useContext(StoreContext)
}
