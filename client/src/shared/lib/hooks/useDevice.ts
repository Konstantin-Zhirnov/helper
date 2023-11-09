import { useLayoutEffect, useState } from 'react'


export const useDevice = () => {

  const [device, setDevice] = useState('')

  useLayoutEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isMobile = /mobile|iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(userAgent)
    setDevice(isMobile ? 'mobile' : 'desktop')
  })
  return device
}
