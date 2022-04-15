import { useState, useCallback, useEffect } from 'react'
import { saveAs } from 'file-saver'
import { Box, Stack, styled, Button, Typography } from '@mui/material'
import { display, positions } from '@mui/system'
import { Eventcalendar as EventCalendar, toast, localeTh } from '@mobiscroll/react'
import * as htmlToImage from 'html-to-image'
import JSZip from 'jszip'

export const Conclude = () => {
  // state for table
  const [classTable, setClassTable] = useState('')
  const [midtermTable, setMidtermTable] = useState('')
  const [finalTable, setFinalTable] = useState('')

  // state for modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  // style for modal box
  const ModalWrapper = styled(Box)`
    min-height: 100vh;
    width: 100vw;
    padding: 16px;
    display: flex;
    position: fixed;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    background: linear-gradient(250deg, #7b2ff7, #f107a3);
  `
  // when isModalOpen, classTable, midtermTable change trigger this
  useEffect(() => {
    if (classTable != '' && midtermTable != '' && finalTable != '' && isModalOpen == true) {
      makeZip(classTable, midtermTable, finalTable)
    }
  }, [isModalOpen, classTable, midtermTable, finalTable])

  // capture component and turn to dataURL
  const onCapture = (id: string, id2: string, id3: string) => {
    const portalDiv = document.getElementById(id)
    if (!portalDiv) {
      throw new Error("The element #portal wasn't found")
    }
    htmlToImage.toPng(portalDiv).then(function (dataUrl) {
      setClassTable(dataUrl)
    })

    const portalDiv2 = document.getElementById(id2)
    if (!portalDiv2) {
      throw new Error("The element #portal wasn't found")
    }
    htmlToImage.toPng(portalDiv2).then(function (dataUrl2) {
      setMidtermTable(dataUrl2)
    })

    const portalDiv3 = document.getElementById(id3)
    if (!portalDiv3) {
      throw new Error("The element #portal wasn't found")
    }
    htmlToImage.toPng(portalDiv3).then(function (dataUrl3) {
      setFinalTable(dataUrl3)
    })
  }

  // create zip file
  const makeZip = (blobs: string, blobs2: string, blobs3: string) => {
    var zip = new JSZip()
    // create text file (รอ data จาก context)
    zip.file('Conclusion.txt', 'Hello World\n')

    // add class_table image to zip file
    var idx = blobs.indexOf('base64,') + 'base64,'.length
    var content = blobs.substring(idx)
    zip.file('class_table.png', content, { base64: true })

    // add midterm table image to zip file
    var idx2 = blobs2.indexOf('base64,') + 'base64,'.length
    var content2 = blobs2.substring(idx2)
    zip.file('midterm_table.png', content2, { base64: true })

    // add final table image to zip file
    var idx3 = blobs3.indexOf('base64,') + 'base64,'.length
    var content3 = blobs3.substring(idx3)
    zip.file('final_table.png', content3, { base64: true })

    // create zip file and download
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, 'time_table.zip')
    })

    // set state clear
    setIsModalOpen(false)
    setClassTable('')
    setMidtermTable('')
    setFinalTable('')
  }

  return (
    <Box>
      {/* รอ component ปุ่มเลือกแสดงจากหน้า 2, 3 */}
      {/* <Box>

      </Box> */}

      {/* real data calendar */}
      <EventCalendar
        theme="ios"
        themeVariant="light"
        clickToCreate={false}
        dragToCreate={false}
        dragToMove={false}
        dragToResize={false}
        locale={localeTh}
        // TODO : implement data of schedule
        // data={selectedCourses.map((course) => ({
        //   id: course.id,
        //   title: course.name,
        //   start: '',
        //   end: '',
        //   color: '#f107a3',
        // }))}
        view={{
          schedule: {
            type: 'week',
          },
        }}
        // onEventClick={onEventClick}
      />

      {/* mock up hidden calendar */}
      {isModalOpen && (
        <Box id="exportContainer">
          <EventCalendar
            theme="ios"
            themeVariant="light"
            clickToCreate={false}
            dragToCreate={false}
            dragToMove={false}
            dragToResize={false}
            locale={localeTh}
            view={{
              schedule: {
                type: 'week',
              },
            }}
          />
        </Box>
      )}

      {isModalOpen && (
        <Box id="exportContainer2" sx={{ width: 2000 }}>
          <EventCalendar
            theme="ios"
            themeVariant="dark"
            clickToCreate={false}
            dragToCreate={false}
            dragToMove={false}
            dragToResize={false}
            locale={localeTh}
            view={{
              schedule: {
                type: 'month',
              },
            }}
          />
        </Box>
      )}

      {isModalOpen && (
        <Box id="exportContainer3" sx={{ width: 2000 }}>
          <EventCalendar
            theme="ios"
            themeVariant="light"
            clickToCreate={false}
            dragToCreate={false}
            dragToMove={false}
            dragToResize={false}
            locale={localeTh}
            view={{
              schedule: {
                type: 'month',
              },
            }}
          />
        </Box>
      )}

      {/* press button then go to modal */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" onClick={() => setIsModalOpen(true)} sx={{ marginTop: 4 }}>
          ดาวน์โหลด
        </Button>
      </Box>
      <Typography variant="h4" color="white">
        จำนวนหน่วยกิตที่เหลือ
      </Typography>
      <Stack spacing={1} sx={{ color: 'white', marginLeft: '20px' }}>
        <Typography> 1. วิชาเฉพาะภาควิชา 9 หน่วยกิต</Typography>
        <Typography> 2. วิชาเลือกหมวดวิทยาศาสตร์กับคณิตศาสตร์ 9 หน่วยกิต</Typography>
        <Typography> 3. วิชาเลือกหมวดภาษา 9 หน่วยกิต</Typography>
        <Typography> 4. วิชาเลือกหมวดมนุษยศาสตร์ 9 หน่วยกิต</Typography>
        <Typography> 5.วิชาเลือกหมวดสังคมศาสตร์ 9 หน่วยกิต</Typography>
        <Typography> 6. วิชาเลือกเสรี 9 หน่วยกิต</Typography>
      </Stack>

      {/* modal popup confirm download or cancel */}
      {isModalOpen && (
        <Box
          sx={{
            width: 1,
            height: 1,
            zIndex: 'tooltip',
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: 'ButtonFace',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <ModalWrapper>
            <Box
              sx={{
                width: 400,
                height: 300,
                position: 'fixed',
                backgroundColor: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                borderRadius: '10%',
              }}
            >
              <Typography>สื่งที่จะได้รับใน zip file ได้แก่</Typography>
              <Box>
                <Typography>1. ตารางเรียน</Typography>
                <Typography>2. ตารางสอบกลางภาค</Typography>
                <Typography>3. ตารางสอยปลายภาค</Typography>
                <Typography>4. สรุปรายวิชาที่ได้ทำการเลือก</Typography>
              </Box>
              <Typography sx={{ margin: 1, fontWeight: 'bold' }}>คุณต้องการที่จะทำการดาวน์โหลดหรือไม่ ?</Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => setIsModalOpen(false)}
                  sx={{
                    marginTop: 2,
                    marginRight: 2,
                  }}
                >
                  ยกเลิก
                </Button>
                <Button
                  variant="contained"
                  onClick={() => onCapture('exportContainer', 'exportContainer2', 'exportContainer3')}
                  sx={{
                    marginTop: 2,
                    marginLeft: 2,
                  }}
                >
                  ยืนยัน
                </Button>
              </Box>
            </Box>
          </ModalWrapper>
        </Box>
      )}
    </Box>
  )
}
