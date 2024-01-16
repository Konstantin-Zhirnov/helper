import React from 'react'

import { EditableInput } from '../../../../entities'
import { useAppDispatch, useAppSelector } from '../../../../shared'

import { fetchUpdateUser } from '../../model/asyncActions'
import { getUserPhone } from '../../model/slice'

interface IProps {
  _id: string
}

const PhoneField: React.FC<IProps> = React.memo(({ _id }) => {
  const dispatch = useAppDispatch()
  const phone = useAppSelector(getUserPhone)

  const memoizedCB = React.useCallback((value) => {
    const body = {
      _id,
      fieldName: 'phone',
      value,
    }
    dispatch(fetchUpdateUser(body))
  }, [fetchUpdateUser])

  return <EditableInput defaultValue={phone} cb={memoizedCB} label='Phone:'/>
})

export { PhoneField }