import { Box, Input, styled, Typography } from '@mui/material'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useStore } from 'hooks/useStore'

const Root = styled(Box)(() => ({
  height: 400,
  width: '100%',
  backgroundColor: 'gray',
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

export const DropItem = () => {
  const [files, setFiles] = useState<File[]>([])
  const [isError, setIsError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const { pee, setPee } = useStore()

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const input = e.currentTarget

    if (!input.files?.length) {
      return
    }

    const file = input.files[0]

    if (file.size / 1024 / 1024 <= 15) {
      setIsError(false)
      setErrorMsg('')
      setFiles((files) => [...files, file])
    } else {
      setIsError(true)
      setErrorMsg('Cannot upload image with size more than 15 MB.')
    }
  }

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles[0].size / 1024 / 1024 <= 15) {
      setIsError(false)
      setErrorMsg('')
      setFiles((files) => [...files, acceptedFiles[0]])
    } else {
      setIsError(true)
      setErrorMsg('Cannot upload image with size more than 15 MB.')
    }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <Root>
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
            upload transcript plz
          </Typography>
        </ContentContainer>
      </DropzoneBox>
    </Root>
  )
}
