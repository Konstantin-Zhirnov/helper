import React from 'react'

import { EditableInput } from '../../../../entities'

import { useAppDispatch, useAppSelector } from '../../../../shared'

import { fetchUpdateUser } from '../../model/asyncActions'
import { getUserTelegram } from '../../model/slice'

interface IProps {
  _id: string
}

const TelegramField: React.FC<IProps> = React.memo(({ _id }) => {
  const dispatch = useAppDispatch()
  const telegram = useAppSelector(getUserTelegram)

  const memoizedCB = React.useCallback((value) => {
    const body = {
      _id,
      fieldName: 'telegram',
      value,
    }
    dispatch(fetchUpdateUser(body))
  }, [fetchUpdateUser])

  return <EditableInput defaultValue={telegram} cb={memoizedCB} label='Telegram:'/>
})

export { TelegramField }