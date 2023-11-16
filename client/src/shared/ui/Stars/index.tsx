import React from 'react'
import { MdOutlineStar, MdOutlineStarBorder, MdOutlineStarHalf } from 'react-icons/md'

import classes from './Stars.module.sass'


interface IProps {
  stars: number
}

const Stars: React.FC<IProps> = ({ stars }) => {

  const getStars = () => {
    switch (stars) {
      case 0.5:
        return (
          <div className={classes.container}>
            <MdOutlineStarHalf /><MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder />
          </div>
        )

      case 1:
        return (
          <div className={classes.container}>
            <MdOutlineStar /><MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder />
          </div>
        )

      case 1.5:
        return (
          <div className={classes.container}>
            <MdOutlineStar /><MdOutlineStarHalf /><MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder />
          </div>
        )

      case 2:
        return (
          <div className={classes.container}>
            <MdOutlineStar /><MdOutlineStar /><MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder />
          </div>
        )

      case 2.5:
        return (
          <div className={classes.container}>
            <MdOutlineStar /><MdOutlineStar /><MdOutlineStarHalf /><MdOutlineStarBorder /><MdOutlineStarBorder />
          </div>
        )

      case 3:
        return (
          <div className={classes.container}>
            <MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStarBorder /><MdOutlineStarBorder />
          </div>
        )

      case 3.5:
        return (
          <div className={classes.container}>
            <MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStarHalf /><MdOutlineStarBorder />
          </div>
        )

      case 4:
        return (
          <div className={classes.container}>
            <MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStarBorder />
          </div>
        )

      case 4.5:
        return (
          <div className={classes.container}>
            <MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStarHalf />
          </div>
        )

      case 5:
        return (
          <div className={classes.container}>
            <MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStar />
          </div>
        )

      default:
        return (
          <div className={classes.container}>
            <MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder />
          </div>
        )
    }
  }

  return getStars()
}

export { Stars }
