import { Box, Button, Input, Paper, styled, Typography } from '@mui/material'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useStore } from 'hooks/useStore'

const Root = styled(Paper)(() => ({
  height: 400,
  width: '100%',
  padding: 0,
  display: 'grid',
  placeItems: 'center',
}))

const DropzoneBox = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  cursor: 'pointer',
}))

const ContentContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
}))

const StyledButton = styled(Button)(() => ({
  textTransform: 'none',
  borderRadius: 10,
  border: '2px #c3c3c37e solid',
  backgroundColor: '#f7f7f74f',
  color: 'white',
  padding: '8px 24px',
  fontSize: '3rem',
  '&:hover, &:focus': {
    backgroundColor: '#c3c3c39b',
    border: '2px #c3c3c39b solid',
  },
}))

type DropItemProps = {
  files: File[]
  setFiles: (file: File[]) => void
  handleSendTranscript: () => Promise<void>
}

export const DropItem = ({ files, setFiles, handleSendTranscript }: DropItemProps) => {
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const { classYear, setClassYear } = useStore()

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const input = e.currentTarget

    if (!input.files?.length) {
      return
    }

    const file = input.files[0]

    if (file.size / 1024 / 1024 <= 15) {
      setIsError(false)
      setErrorMsg('')
      setFiles([...files, file])
    } else {
      setIsError(true)
      setErrorMsg('Cannot upload image with size more than 15 MB.')
    }
  }

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0].size / 1024 / 1024 <= 15) {
      setIsError(false)
      setErrorMsg('')
      setFiles([...files, acceptedFiles[0]])
    } else {
      setIsError(true)
      setErrorMsg('Cannot upload image with size more than 15 MB.')
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <Root>
      {files.length === 0 ? (
        <DropzoneBox {...getRootProps()}>
          <Input
            type="file"
            id="file"
            className="input-file"
            onChange={handleOnChange}
            {...getInputProps()}
            // * Fixed `getInputProps` bug //
            /**/ color={undefined} /**/
            /**/ size={undefined} /**/
            // *************************** //
          />
          <ContentContainer>
            <Typography variant="h3" color="#ffffff" align="center">
              อัปโหลดทรานสคริปต์
            </Typography>
          </ContentContainer>
        </DropzoneBox>
      ) : (
        <StyledButton onClick={async () => await handleSendTranscript()}>ส่งทรานสคริปต์</StyledButton>
      )}
    </Root>
  )
}
