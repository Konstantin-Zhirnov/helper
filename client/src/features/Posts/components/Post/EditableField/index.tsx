import React from 'react'

import { EditableInput } from '../../../../../entities'
import { useAppDispatch } from '../../../../../shared'

import { fetchUpdatePost } from '../../../model/asyncActions'

interface IProps {
  _id: string
  field: string
  defaultValue: string
  label: string
}

const EditableField: React.FC<IProps> = React.memo(({ _id, defaultValue, field, label }) => {
  const dispatch = useAppDispatch()

  const memoizedCB = React.useCallback(
    (value) => {
      const body = {
        _id,
        field: { [`${field}`]: value },
      }
      dispatch(fetchUpdatePost(body))
    },
    [fetchUpdatePost],
  )

  return <EditableInput defaultValue={defaultValue} cb={memoizedCB} label={label} />
})

export { EditableField }
