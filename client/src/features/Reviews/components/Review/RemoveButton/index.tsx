import React from 'react'
import { MdDelete } from 'react-icons/md'

import { useAppDispatch } from '../../../../../shared'

import { fetchRemoveReview} from '../../../model/asyncActions'

import classes from './RemoveButton.module.sass'


interface IProps {
  _id: string
  stars: number
  authorId: string
  userId: string
}

const RemoveButton: React.FC<IProps> = React.memo(({ _id, stars, authorId, userId }) => {

  const dispatch = useAppDispatch()

  const handleClick = () => {
      dispatch(fetchRemoveReview({ _id, stars, authorId, userId }))
  }


  return (
            <button
                aria-label='Remove review button'
                className={classes.btn}
                onClick={handleClick}
            >
                <MdDelete />
            </button>
  )
})

export { RemoveButton }
