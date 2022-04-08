import { useEffect } from 'react'
import { animate, MotionValue, useMotionValue } from 'framer-motion'

const inactiveShadow = '0px 0px 0px rgba(0,0,0,0.8)'
const activeShadow = '5px 5px 10px rgba(0,0,0,0.3)'

export const useRaisedShadow = (value: MotionValue<number>) => {
  const boxShadow = useMotionValue(inactiveShadow)

  useEffect(() => {
    let isActive = false
    value.onChange((latest) => {
      const wasActive = isActive
      if (latest !== 0) {
        isActive = true
        if (!wasActive) {
          animate(boxShadow, activeShadow)
        }
      } else {
        isActive = false
        if (wasActive) {
          animate(boxShadow, inactiveShadow)
        }
      }
    })
  }, [value, boxShadow])

  return boxShadow
}
