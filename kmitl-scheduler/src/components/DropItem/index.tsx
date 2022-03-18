import { Box, styled } from '@mui/material'
import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useStore } from 'hooks/useStore'

import { DragableSection } from 'components/DragableSection'

const Root = styled(Box)(() => ({
  height: '400px',
  width: '100%',
  backgroundColor: 'gray',
  display: 'grid',
  placeItems: 'center',
}))

const DropzoneBox = styled(Box)`
  width: 100%;
  height: 100%;
  cursor: pointer;
`

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
        <input type="file" id="file" className="input-file" onChange={handleOnChange} {...getInputProps()} />
      </DropzoneBox>
      <DragableSection value={pee} setValue={setPee} />
    </Root>
  )
}
