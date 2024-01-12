import React from 'react'
import cn from 'classnames'
import { MdDelete, MdWarningAmber } from 'react-icons/md'


import { useAppDispatch } from '../../../../shared'

import { fetchRemoveUser } from '../../model/asyncActions'

import 'react-international-phone/style.css'
import classes from './RemoveAccount.module.sass'


interface IProps {
  _id: string
  canRemove: boolean
}

const RemoveAccount: React.FC<IProps> = React.memo(({ _id, canRemove }) => {

  const dispatch = useAppDispatch()

  const removeAccount = () => {
    if (canRemove) {
      dispatch(fetchRemoveUser(_id))
    }
  }

  return (
    <div className={classes.card}   >
      <div className={classes.cardHeader}>
        <h1 className={classes.heading}><MdWarningAmber /> Delete account:</h1>
      </div>

      <div className={classes.cardBody}>
        <p className={classes.text}>You can delete your account if you have no active posts and reviews</p>

        <button
          aria-label='Remove post button'
          className={cn(classes.btn, {[classes.can]: canRemove})}
          onClick={removeAccount}
        ><MdDelete /></button>
      </div>
    </div>)
})

export { RemoveAccount }