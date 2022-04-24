import { Dispatch, SetStateAction, useState } from 'react'
import { Credit, isRequiredCredit, RequiredCredit } from 'types'

const initialCredit: RequiredCredit = {
  department: -1,
  free: -1,
  human: -1,
  language: -1,
  sciMath: -1,
  social: -1,
  specific_department: -1,
}

export type CreditState = {
  baseCredit: RequiredCredit
  calculatedCredit: RequiredCredit
}

export type CreditAction = {
  setBaseCredit: Dispatch<SetStateAction<RequiredCredit>>
  setCalculatedCredit: Dispatch<SetStateAction<RequiredCredit>>
  initAllCredit: (credit: Credit) => void
}

export const useCredit = (): CreditState & CreditAction => {
  const [baseCredit, setBaseCredit] = useState<RequiredCredit>({ ...initialCredit })
  const [calculatedCredit, setCalculatedCredit] = useState<RequiredCredit>({ ...initialCredit })

  const initAllCredit = (credit: Credit) => {
    if (isRequiredCredit(credit)) {
      setBaseCredit(credit)
      setCalculatedCredit(credit)
    }
  }

  return {
    baseCredit,
    setBaseCredit,
    calculatedCredit,
    setCalculatedCredit,
    initAllCredit,
  }
}
