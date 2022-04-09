import { useContext } from 'react'

import { StoreContext } from 'contexts/StoreContext'
import { DialogContext } from 'contexts/DialogContext'
import { ThemeContext } from 'contexts/ThemeContext'

export const useStore = () => useContext(StoreContext)
export const useDialog = () => useContext(DialogContext)
export const usethemeMode = () => useContext(ThemeContext)
