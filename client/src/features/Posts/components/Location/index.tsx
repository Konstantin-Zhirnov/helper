import React from 'react'

import { Locations } from './Locations'
import { Button } from './Button'

interface IProps {
  search?: boolean
}
const Location: React.FC<IProps> = React.memo(({ search }) => {
  return (
    <>
      <Button search={search} />
      <Locations search={search} />
    </>
  )
})

export { Location }
