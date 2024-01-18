import React from 'react'
import cn from "classnames";
import { NavLink } from 'react-router-dom'

import { Stars, daysAgo } from '../../../../shared'

import { RemoveButton } from './RemoveButton'
import { Images } from "./Images";

import classes from './Review.module.sass'


interface IProps {
    _id?: string
    title: string
    description: string
    stars: number
    userId: string
    userName: string
    images: string[]
    name: string
    authorId: string
    time: number
    pathname: string
}

const Review: React.FC<IProps> = React.memo(({
                                                 _id,
                                                 title,
                                                 description,
                                                 stars,
                                                 userId,
                                                 userName,
                                                 images,
                                                 name,
                                                 authorId,
                                                 time,
                                                 pathname
                                             }) => {


  const memoizedImages = React.useMemo(() => images, [images])

  return (
    <li className={classes.container}>
        <div className={cn(classes.user, {[classes.pr_40]: pathname === '/profile'})}>
           <p className={classes.name}>{userName}</p>
           <Stars stars={stars} countReviews={1} />
        </div>

        <div className={classes.title}>
            <p className={classes.text}>{title}</p>
        </div>

        <div className={ classes.description }>
            <p className={classes.text}>{description}</p>
        </div>

        {
            !!images.length
               ? <Images imagesSrcArray={memoizedImages} />
               : null
        }

        <div className={classes.footer}>
            <p className={classes.text}>{daysAgo(time)}</p>
            <p className={classes.text}>{name}</p>
        </div>

        {
            pathname === '/profile' && <RemoveButton _id={_id} stars={stars} authorId={authorId} userId={userId}/>
        }
    </li>
  )
})

export { Review }
