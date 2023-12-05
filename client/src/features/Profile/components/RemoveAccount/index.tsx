import React from 'react'
import cn from 'classnames'
import { Card, CardBody, CardHeader, Heading, IconButton } from '@chakra-ui/react'
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
    <Card className={classes.card}>
      <CardHeader className={classes.cardHeader}>
        <Heading size='md' className={classes.heading}><MdWarningAmber /> Delete account:</Heading>
      </CardHeader>

      <CardBody className={classes.cardBody}>
        <p>You can delete your account if you have no active posts and reviews</p>
        <IconButton
          isRound={true}
          variant='solid'
          aria-label='Remove post button'
          fontSize='20px'
          className={cn(classes.remove, { [`${classes.red}`]: canRemove })}
          icon={<MdDelete />}
          onClick={removeAccount}
        />
      </CardBody>
    </Card>)
})

export { RemoveAccount }