import React from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import MoveDownIcon from '@mui/icons-material/MoveDown'
import { SubjectBlock } from 'types'

import { subjectData } from 'mock/subjectData'

interface BlockDetailDialogProps {
  open: boolean
  onClose: () => void
  moveToSelectedBlocks: (block?: SubjectBlock) => void
  block?: SubjectBlock
}

interface TextBoxProps {
  keyof: string
  values: string[]
  icon?: string
}

interface DialogTitleProps {
  id: string
  children?: React.ReactNode
  onClose: () => void
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  )
}

const TextBox: React.FC<TextBoxProps> = ({ keyof, values, icon }) => {
  const renderIcon = (icon?: string): React.ReactNode => {
    if (!icon) return null
    switch (icon) {
      case 'clipboard':
        return (
          <IconButton>
            <ContentCopyIcon />
          </IconButton>
        )
      default:
        return null
    }
  }
  return (
    <Box
      sx={{
        my: 2,
      }}
    >
      <Stack direction="row" alignItems={`${values.length > 1 ? 'flex-start' : 'center'}`}>
        <Typography>{keyof} : </Typography>
        <Stack sx={{ ml: 1 }}>
          {values.map((value, index) => (
            <Box key={`${value}-${index}`}>{value}</Box>
          ))}
        </Stack>
        {renderIcon(icon)}
      </Stack>
    </Box>
  )
}

const BlockDetailDialog: React.FC<BlockDetailDialogProps> = ({ onClose, open, block, moveToSelectedBlocks }) => {
  return (
    <Dialog onClose={onClose} open={open} sx={{}}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
        คณิตศาสตร์
      </BootstrapDialogTitle>
      <DialogContent dividers>
        {subjectData.map((block) => (
          <TextBox key={block.key} keyof={block.key} values={block.values} icon={block.icon ? block.icon : undefined} />
        ))}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => moveToSelectedBlocks(block)} variant="contained" endIcon={<MoveDownIcon />}>
          เพิ่มลงในตาราง
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BlockDetailDialog
