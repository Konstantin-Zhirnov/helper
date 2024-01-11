import React from 'react'

import {PasswordChanging, getIsPostsByUser, getIsReviewsByAuthor, getUserId, ProfileMenuType} from '../../features'
import { useAppSelector } from '../../shared'

import { AccountDetails } from "./AccountDetails";

import {Reviews} from "../Reviews";

import classes from './ProfileInfo.module.sass'
import {ProfilePosts} from "./ProfilePosts";

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
        if (activeItem === 'Reviews') return <Reviews reason='user' />
    }

  return (
    <div className={classes.wrapper}>
      <h2 className={classes.title}>{getTitle()}</h2>
        <div className={classes.container}>
            {getContent()}
        </div>
    </div>
  )
})

export { ProfileInfo }