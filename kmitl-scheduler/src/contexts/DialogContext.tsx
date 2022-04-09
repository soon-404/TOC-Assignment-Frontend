import { createContext, ReactNode, useState, FC } from 'react'

interface IDialogContext {
  dialogContent: ReactNode | null
  isDialogOpen: boolean
  open: (content: ReactNode | null) => void
  close: () => void
}

interface DialogProviderProps {
  children: ReactNode
}

export const DialogContext = createContext<IDialogContext>({} as IDialogContext)

export const DialogProvider: FC<DialogProviderProps> = ({ children }) => {
  const [dialogContent, setDialogContent] = useState<ReactNode | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const open = (content: ReactNode | null) => {
    setDialogContent(content)
    setIsDialogOpen(true)
  }

  const close = () => {
    setIsDialogOpen(false)
    setDialogContent(null)
  }

  return (
    <DialogContext.Provider value={{ dialogContent, isDialogOpen, open, close }}>{children}</DialogContext.Provider>
  )
}
