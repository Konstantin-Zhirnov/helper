import React from 'react'
import cn from "classnames"

import {PasswordChanging, getIsPostsByUser, getIsReviewsByAuthor, getUserId, ProfileMenuType} from '../../../features'
import { useAppSelector } from '../../../shared'

import { AccountDetails } from "./AccountDetails"

import { ProfilePosts } from "./ProfilePosts"
import { Reviews } from "../Reviews"

import classes from './ProfileInfo.module.sass'



interface IProps {
    activeItem: ProfileMenuType
}

const ProfileInfo: React.FC<IProps> = React.memo(({ activeItem }) => {

    const isPosts = useAppSelector(getIsPostsByUser)
    const isReviews = useAppSelector(getIsReviewsByAuthor)
    const _id = useAppSelector(getUserId)

    const getTitle = () => {
        if (activeItem === 'Profile') return 'Account details'
        if (activeItem === 'Password') return 'Password changing'
        if (activeItem === 'Posts') return 'The posts you have published'
        if (activeItem === 'Reviews') return 'The reviews that you have published'
    }

    const getContent = () => {
        if (activeItem === 'Profile') return <AccountDetails canRemove={!isPosts && !isReviews} />
        if (activeItem === 'Password') return <PasswordChanging _id={_id} />
        if (activeItem === 'Posts') return <ProfilePosts />
        if (activeItem === 'Reviews') return <Reviews />
    }

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>{getTitle()}</h2>
        <div className={cn(classes.container, {[classes.cards]: activeItem === 'Posts' || activeItem === 'Reviews'})}>
            {getContent()}
        </div>
    </div>
  )
})

export { ProfileInfo }