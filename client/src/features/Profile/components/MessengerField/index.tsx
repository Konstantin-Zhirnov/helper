import React from 'react'

import { EditableInput } from '../../../../entities'

import { useAppDispatch, useAppSelector } from '../../../../shared'

import { fetchUpdateUser } from '../../model/asyncActions'
import { getUserMessenger } from '../../model/slice'

interface IProps {
  _id: string
}

const MessengerField: React.FC<IProps> = React.memo(({ _id }) => {
  const dispatch = useAppDispatch()
  const messenger = useAppSelector(getUserMessenger)

  const memoizedCB = React.useCallback(
    (value: string) => {
      const body = {
        _id,
        fieldName: 'messenger',
        value,
      }
      dispatch(fetchUpdateUser(body))
    },
    [fetchUpdateUser],
  )

  return <EditableInput defaultValue={messenger} cb={memoizedCB} label="Messenger:" />
})

export { MessengerField }
