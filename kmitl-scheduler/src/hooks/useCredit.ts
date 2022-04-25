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
  usedCredit: RequiredCredit
}

export type CreditAction = {
  setUsedCredit: Dispatch<SetStateAction<RequiredCredit>>
  initAllCredit: (credit: Credit | RequiredCredit) => void
}

export const useCredit = (): CreditState & CreditAction => {
  const [usedCredit, setUsedCredit] = useState<RequiredCredit>({ ...initialCredit })

  const initAllCredit = (credit: Credit | RequiredCredit) => {
    if (isRequiredCredit(credit)) {
      setUsedCredit(credit)
    }
  }

  return {
    usedCredit,
    setUsedCredit,
    initAllCredit,
  }
}
