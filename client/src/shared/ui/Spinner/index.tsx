import * as React from 'react'
import { ImSpinner9 } from 'react-icons/im'

import classes from './Spinner.module.sass'

const Spinner: React.FC = () => {
  return (
    <div className={classes.spinner}>
      <ImSpinner9 size={34} />
    </div>
  )
}
export { Spinner }
