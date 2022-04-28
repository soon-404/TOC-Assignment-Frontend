import { useState, useEffect, useMemo } from 'react'
import { saveAs } from 'file-saver'
import { Box, styled, Button, Typography, Paper, Stack } from '@mui/material'
import { Eventcalendar as EventCalendar, toast, localeTh } from '@mobiscroll/react'
import { toPng } from 'html-to-image'
import JSZip from 'jszip'
import { getFinalSchedules, getMidtermSchedules, getStudySchedules } from 'utils/course'
import { useStore } from 'hooks/useStore'
import { CourseCategory } from 'types'
import { getRemainingCredit } from 'utils/credit'
import { categoryMapping } from 'constants'


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

export const Conclude = () => {
  // store
  const { allCourses, selectedCourses, sectionMapping, usedCredit } = useStore()

  const remainingCredit = useMemo(() => getRemainingCredit(usedCredit), [usedCredit])

  // state for table
  const [classTable, setClassTable] = useState('')
  const [midtermTable, setMidtermTable] = useState('')
  const [finalTable, setFinalTable] = useState('')
  const [test, setTest] = useState('M')

  // state for modal
  const [isModalOpen, setIsModalOpen] = useState(false)

  // data table
  const studySchedule = useMemo(() => getStudySchedules(allCourses, selectedCourses, sectionMapping), [selectedCourses])
  const midtermSchedule = useMemo(() => getMidtermSchedules(allCourses, selectedCourses), [selectedCourses])
  const finalSchedule = useMemo(() => getFinalSchedules(allCourses, selectedCourses), [selectedCourses])

  console.log(allCourses[selectedCourses.main[0]])
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
    toPng(portalDiv).then(function (dataUrl) {
      setClassTable(dataUrl)
    })

    const portalDiv2 = document.getElementById(id2)
    if (!portalDiv2) {
      throw new Error("The element #portal wasn't found")
    }
    toPng(portalDiv2).then(function (dataUrl2) {
      setMidtermTable(dataUrl2)
    })

    const portalDiv3 = document.getElementById(id3)
    if (!portalDiv3) {
      throw new Error("The element #portal wasn't found")
    }
    toPng(portalDiv3).then(function (dataUrl3) {
      setFinalTable(dataUrl3)
    })
  }

  // Create Text File
  const makeText = () => {
    let text = ""
    if (selectedCourses.main.length > 0){
      for (let i = 0; i < selectedCourses.main.length; i++){
        let row = ""
        let data = allCourses[selectedCourses.main[i]]
        row = `${selectedCourses.main[i]} ${data?.name} ${data?.course_type} ${data?.credit} ${data?.teacher}`
        text += row
        text += '\n'
      }
      
    }
    if (selectedCourses.option.length > 0){
      for (let i = 0; i < selectedCourses.option.length; i++) {
        let row = ''
        let data = allCourses[selectedCourses.option[i]]
        console.log(data)
        row = `${selectedCourses.option[i]} ${data?.name} ${data?.course_type} ${data?.credit} ${data?.teacher}`
        text += row
        text += '\n'
      }
    }
    return text
  }
  // create zip file
  const makeZip = (blobs: string, blobs2: string, blobs3: string) => {
    var zip = new JSZip()
    // create text file (รอ data จาก context)
    zip.file('subject_register.txt', makeText())

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

  // set calendar first subject date show
  const fixTestDate = (testSchedule: any) => {
    let dataSort = [...testSchedule]
    dataSort = dataSort.sort(
      (a: any, b: any) =>
        parseInt(a.start.format('YYYY-MM-DD').split('-')[2]) - parseInt(a.start.format('YYYY-MM-DD').split('-')[2]),
    )
    const testDate = new Date(
      parseInt(dataSort[0].start.format('YYYY-MM-DD').split('-')[0]),
      parseInt(dataSort[0].start.format('YYYY-MM-DD').split('-')[1]) - 1,
      parseInt(dataSort[0].start.format('YYYY-MM-DD').split('-')[2]),
    )
    return testDate
  }

  const setCalendar = (testSchedule: any) => {
    if (testSchedule) {
      if (testSchedule.length > 0) {
        return fixTestDate(testSchedule)
      }
    }

    return []
  }

  return (
    <Box>
      {/* real data calendar */}
      <Typography sx={{ marginBottom: 5, color: 'white', fontSize: 35, fontWeight: 800 }}>ตารางเรียน</Typography>
      <EventCalendar
        theme="ios"
        themeVariant="light"
        clickToCreate={false}
        dragToCreate={false}
        dragToMove={false}
        dragToResize={false}
        data={studySchedule}
        locale={localeTh}
        view={{
          schedule: {
            type: 'week',
          },
        }}
      />
      <Typography sx={{ marginTop: 5, marginBottom: 5, color: 'white', fontSize: 35, fontWeight: 800 }}>
        ตารางสอบกลางภาค
      </Typography>
      <EventCalendar
        theme="ios"
        themeVariant="light"
        clickToCreate={false}
        dragToCreate={false}
        dragToMove={false}
        dragToResize={false}
        data={midtermSchedule}
        locale={localeTh}
        selectedDate={setCalendar(midtermSchedule)}
        view={{
          schedule: {
            type: 'month',
          },
        }}
      />
      <Typography sx={{ marginTop: 5, marginBottom: 5, color: 'white', fontSize: 35, fontWeight: 800 }}>
        ตารางสอบปลายภาค
      </Typography>
      <EventCalendar
        theme="ios"
        themeVariant="light"
        clickToCreate={false}
        dragToCreate={false}
        dragToMove={false}
        dragToResize={false}
        data={finalSchedule}
        locale={localeTh}
        selectedDate={setCalendar(finalSchedule)}
        view={{
          schedule: {
            type: 'month',
          },
        }}
      />

      {/* mock up hidden calendar */}
      {isModalOpen && (
        <Box id="exportContainerStudy">
          <EventCalendar
            theme="ios"
            themeVariant="light"
            clickToCreate={false}
            dragToCreate={false}
            dragToMove={false}
            dragToResize={false}
            locale={localeTh}
            data={studySchedule}
            view={{
              schedule: {
                type: 'week',
              },
            }}
          />
        </Box>
      )}

      {isModalOpen && (
        <Box id="exportContainerMidterm" sx={{ width: 4500 }}>
          <EventCalendar
            theme="ios"
            themeVariant="light"
            clickToCreate={false}
            dragToCreate={false}
            dragToMove={false}
            dragToResize={false}
            locale={localeTh}
            data={midtermSchedule}
            selectedDate={setCalendar(midtermSchedule)}
            view={{
              schedule: {
                type: 'month',
              },
            }}
          />
        </Box>
      )}

      {isModalOpen && (
        <Box id="exportContainerFinal" sx={{ width: 4500 }}>
          <EventCalendar
            theme="ios"
            themeVariant="light"
            clickToCreate={false}
            dragToCreate={false}
            dragToMove={false}
            dragToResize={false}
            locale={localeTh}
            data={finalSchedule}
            selectedDate={setCalendar(finalSchedule)}
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

      <Typography variant="h4" color="#ffffff" align="center" sx={{ fontWeight: 600 }}>
        จำนวนหน่วยกิจที่เหลือ
      </Typography>
      <Box my={4}>
        {Object.keys(categoryMapping).map((key) => (
          <Stack direction="row" justifyContent="space-around" width="100%">
            <Box minWidth={'400px'}>
              <Typography variant="body1" color="#ffffff" align="left">
                {categoryMapping[key as never]}
              </Typography>
            </Box>
            <Box minWidth={'4ch'}>
              <Typography variant="body1" color="#ffffff" align="right">
                {remainingCredit[key as never]}
              </Typography>
            </Box>
            <Typography variant="body1" color="#ffffff" align="left">
              หน่วยกิจ
            </Typography>
          </Stack>
        ))}
      </Box>

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
                <Typography>3. ตารางสอบปลายภาค</Typography>
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
                  onClick={() => onCapture('exportContainerStudy', 'exportContainerMidterm', 'exportContainerFinal')}
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
