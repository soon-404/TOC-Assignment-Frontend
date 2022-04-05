import React from 'react'
import { Box, Dialog, DialogTitle, Stack, Typography } from '@mui/material'

import mockData from './mock'

interface BlockDetailDialogProps {
  open: boolean
  onClose: () => void
}

interface TextBoxProps {
  keyof: string
  values: string[]
  icon?: string
}

const TextBox: React.FC<TextBoxProps> = ({ keyof, values, icon }) => {
  const renderIcon = (icon?: string): React.ReactNode => {
    if (!icon) return null
    switch (icon) {
      case 'clipboard':
        return <i className="fas fa-clipboard"></i>
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
      <Typography>{keyof} :</Typography>
      <Stack>
        {values.map((value, index) => (
          <Typography key={`${value}-${index}`} sx={{ my: 1 }}>
            {value}
          </Typography>
        ))}
      </Stack>
      {renderIcon(icon)}
    </Box>
  )
}

const BlockDetailDialog: React.FC<BlockDetailDialogProps> = ({ onClose, open }) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>คณิตศาสตร์</DialogTitle>
      {mockData.map((block) => (
        <TextBox key={block.key} keyof={block.key} values={block.values} icon={block.icon ? block.icon : undefined} />
      ))}
    </Dialog>
  )
}

export default BlockDetailDialog
