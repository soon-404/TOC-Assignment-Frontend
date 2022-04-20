import { Dialog as DialogMui, DialogContent, IconButton, styled } from '@mui/material'
import { Close } from '@mui/icons-material'
import { useDialog } from 'hooks/useStore'

const Content = styled(DialogContent)(() => ({
  padding: 8,
}))

const CloseIconButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: 8,
  top: 8,
  color: theme.palette.grey[500],
}))

const CloseButton = ({ onClick }: { onClick: () => void }) => (
  <CloseIconButton aria-label="close" onClick={onClick}>
    <Close />
  </CloseIconButton>
)

export const GlobalDialog = () => {
  const { isDialogOpen, close, dialogContent } = useDialog()

  if (!dialogContent) return null

  return (
    <DialogMui
      onClose={close}
      open={isDialogOpen}
      PaperProps={{ style: { backgroundColor: 'white', minWidth: '50vw' } }}
    >
      <CloseButton onClick={close} />
      <Content>{dialogContent}</Content>
    </DialogMui>
  )
}
