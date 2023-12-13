import React from 'react'
import { Box } from '@chakra-ui/react'

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

  const memoizedCB = React.useCallback((value) => {
    const body = {
      _id,
      fieldName: 'name',
      value,
    }
    dispatch(fetchUpdateUser(body))
  }, [fetchUpdateUser])

  return (
    <Box>
      <EditableInput defaultValue={name} cb={memoizedCB} />
    </Box>)
})

export { NameField }