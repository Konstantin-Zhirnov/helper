import React from 'react'

import { EditableInput } from '../../../../entities'

import { useAppDispatch, useAppSelector } from '../../../../shared'

import { fetchUpdateUser } from '../../model/asyncActions'
import { getUserName } from '../../model/slice'

interface IProps {
  _id: string
}

const TelegramField: React.FC<IProps> = React.memo(({ _id }) => {
  const dispatch = useAppDispatch()
  const name = useAppSelector(getUserName)

  const memoizedCB = React.useCallback((value) => {
    const body = {
      _id,
      fieldName: 'telegram',
      value,
    }
    dispatch(fetchUpdateUser(body))
  }, [fetchUpdateUser])

  return <EditableInput defaultValue={name} cb={memoizedCB} label='Telegram'/>
})

export { TelegramField }