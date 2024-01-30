import React from 'react'
import { MdDelete } from 'react-icons/md'

import { useAppDispatch } from '../../../../../shared'

import { fetchRemovePost } from '../../../model/asyncActions'

import classes from './RemoveButton.module.sass'

interface IProps {
  _id?: string
  postAuthorId: string
}

const RemoveButton: React.FC<IProps> = React.memo(({ _id, postAuthorId }) => {
  const dispatch = useAppDispatch()

  const removePost = () => {
    dispatch(fetchRemovePost({ _id, folder: postAuthorId }))
  }

  return (
    <button aria-label="Remove post button" className={classes.btn} onClick={removePost}>
      <MdDelete />
    </button>
  )
})

export { RemoveButton }
