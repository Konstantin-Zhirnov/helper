import React from 'react'
import ReactStars from 'react-rating-stars-component'
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md'

import { useAppDispatch, useAppSelector } from '../../../../../shared'
import { getStarsErrorMessage, setStarsErrorMessage } from '../../../model/slice'

import classes from './Stars.module.sass'

interface IProps {
  stars: number
  setStars: React.Dispatch<React.SetStateAction<number>>
}

const Stars: React.FC<IProps> = React.memo(({ stars, setStars }) => {
  const dispatch = useAppDispatch()
  const isStarsErrorMessage = useAppSelector(getStarsErrorMessage)

  const ratingChanged = (newRating) => {
    setStars(newRating)
  }

  React.useEffect(() => {
    if (isStarsErrorMessage && stars) {
      dispatch(setStarsErrorMessage(false))
    }
  }, [isStarsErrorMessage, stars])

  return (
    <>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={28}
        emptyIcon={<MdOutlineStarBorder />}
        fullIcon={<MdOutlineStar />}
        activeColor="#ffd700"
      />
      <div className={classes.stars_error_container}>
        {isStarsErrorMessage && (
          <p className={classes.stars_error_text}>Select the number of stars</p>
        )}
      </div>
    </>
  )
})

export { Stars }
