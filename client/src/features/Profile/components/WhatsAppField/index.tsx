import React from 'react'

import { EditableInput } from '../../../../entities'

import { useAppDispatch, useAppSelector } from '../../../../shared'

import { fetchUpdateUser } from '../../model/asyncActions'
import { getUserWhatsApp } from '../../model/slice'

interface IProps {
  _id: string
}

const WhatsAppField: React.FC<IProps> = React.memo(({ _id }) => {
  const dispatch = useAppDispatch()
  const whatsapp = useAppSelector(getUserWhatsApp)

  const memoizedCB = React.useCallback((value) => {
    const body = {
      _id,
      fieldName: 'whatsapp',
      value,
    }
    dispatch(fetchUpdateUser(body))
  }, [fetchUpdateUser])

  return <EditableInput defaultValue={whatsapp} cb={memoizedCB} label='WhatsApp'/>
})

export { WhatsAppField }