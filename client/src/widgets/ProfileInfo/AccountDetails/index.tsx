import React from 'react'

import {EditableInput} from "../../../entities";
import {
    getUserId,
    NameField,
    PhoneField, ProfileAvatar,
    RemoveAccount,
    TelegramField,
    WhatsAppField,
} from '../../../features'
import { useAppSelector } from '../../../shared'

import { getUserEmail } from '../../../features/Profile/model/slice'

import classes from './AccountDetails.module.sass'


interface IProps {
  canRemove: boolean
}

const AccountDetails: React.FC<IProps> = React.memo(({canRemove}) => {

  const _id = useAppSelector(getUserId)
  const email = useAppSelector(getUserEmail)


  return (
    <>
      <ProfileAvatar />

      <div className={classes.card_container}>
          <div className={classes.card}>
              <NameField _id={_id} />
          </div>

          <div className={classes.card}>
              <EditableInput defaultValue={email} label='Email'/>
          </div>

          <div className={classes.card}>
              <PhoneField _id={_id} />
          </div>

          <div className={classes.card}>
              <WhatsAppField _id={_id} />
          </div>

          <div className={classes.card}>
              <TelegramField _id={_id} />
          </div>
      </div>

      <RemoveAccount _id={_id} canRemove={canRemove} />
    </>
  )
})

export { AccountDetails }