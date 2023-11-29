import React from 'react'
import { MdOutlineStar, MdOutlineStarBorder, MdOutlineStarHalf } from 'react-icons/md'

import classes from './Stars.module.sass'


interface IProps {
  stars: number
  countReviews: number
}

const Stars: React.FC<IProps> = React.memo(({ stars, countReviews }) => {

  const starsMap = new Map([
    [0, <>
      <MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder /></>],
    [0.5, <>
      <MdOutlineStarHalf /><MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder /></>],
    [1, <>
      <MdOutlineStar /><MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder /></>],
    [1.5, <>
      <MdOutlineStar /><MdOutlineStarHalf /><MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder /></>],
    [2, <><MdOutlineStar /><MdOutlineStar /><MdOutlineStarBorder /><MdOutlineStarBorder /><MdOutlineStarBorder /></>],
    [2.5, <><MdOutlineStar /><MdOutlineStar /><MdOutlineStarHalf /><MdOutlineStarBorder /><MdOutlineStarBorder /></>],
    [3, <><MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStarBorder /><MdOutlineStarBorder /></>],
    [3.5, <><MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStarHalf /><MdOutlineStarBorder /></>],
    [4, <><MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStarBorder /></>],
    [4.5, <><MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStarHalf /></>],
    [5, <><MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStar /><MdOutlineStar /></>],
  ])

  function roundToHalf(number) {
    return Math.round(number * 2) / 2
  }

  return (
    <div className={classes.container}>
      {starsMap.get(roundToHalf(stars / countReviews) || 0)}
    </div>
  )
})

export { Stars }
