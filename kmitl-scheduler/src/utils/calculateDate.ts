export const CalculateDate = (start: number, stop: number) => {
  const weekday = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
  let time = ''
  if (start === 0) time = 'ไม่ระบุ'
  else {
    const Sdate = new Date(start * 1000)
    time += weekday[Sdate.getDay()] + ' ' + Sdate.getHours() + ':'
    if (Sdate.getMinutes() < 10) time += '0'
    time += Sdate.getMinutes()

    const Edate = new Date(stop * 1000)
    time += ' - ' + Edate.getHours() + ':'
    if (Edate.getMinutes() < 10) time += '0'
    time += Edate.getMinutes() + ' น.'
  }

  return time
}
