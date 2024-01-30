import React from 'react'
import { MdDelete } from 'react-icons/md'

import { useAppDispatch } from '../../../../../../shared'

import { fetchRemoveImage } from '../../../../model/asyncActions'

import classes from './RemoveImgButton.module.sass'

interface IProps {
  _id: string
  authorId: string
  item: string
}

const RemoveImgButton: React.FC<IProps> = React.memo(({ _id, authorId, item }) => {
  const dispatch = useAppDispatch()

  const removeImage = (e, image) => {
    e.stopPropagation()
    dispatch(fetchRemoveImage({ _id, image, folder: authorId }))
  }

  return (
    <button
      className={classes.btn}
      aria-label="remove image button"
      onClick={(e) => removeImage(e, item)}
    >
      <MdDelete />
    </button>
  )
})

export { RemoveImgButton }
