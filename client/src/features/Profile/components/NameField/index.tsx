import React from 'react'

import { EditableInput } from '../../../../entities'

import { useAppDispatch, useAppSelector } from '../../../../shared'

import { fetchUpdateUser } from '../../model/asyncActions'
import { getUserName } from '../../model/slice'

interface IProps {
  _id: string
}

const NameField: React.FC<IProps> = React.memo(({ _id }) => {
  const dispatch = useAppDispatch()
  const name = useAppSelector(getUserName)

  const memoizedCB = React.useCallback(
    (value) => {
      const body = {
        _id,
        fieldName: 'name',
        value,
      }
      dispatch(fetchUpdateUser(body))
    },
    [fetchUpdateUser],
  )

  return <EditableInput defaultValue={name} cb={memoizedCB} label="Name:" />
})

export { NameField }
