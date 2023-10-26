import * as React from 'react'
import { CircularProgress } from '@chakra-ui/react'

import classes from './Circular.module.sass'

const Circular: React.FC = () => {
  return (
    <div className={classes.container}>
      <CircularProgress isIndeterminate color="blue.300" />
    </div>
  )
}

export default Circular
