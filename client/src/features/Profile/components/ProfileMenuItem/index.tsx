import React from 'react'
import cn from 'classnames'
import { FaUserLarge, FaLock } from 'react-icons/fa6'
import { FaEdit } from 'react-icons/fa'
import { BsFileEarmarkPost } from 'react-icons/bs'

import { useAppDispatch } from '../../../../shared'

import { setActiveScreen } from '../../model/slice'
import { ProfileMenuType } from '../../types'

import classes from './ProfileMenuItem.module.sass'

interface IProps {
  text: ProfileMenuType
  activeItem: ProfileMenuType
}

const ProfileMenuItem: React.FC<IProps> = React.memo(({ text, activeItem }) => {
  const dispatch = useAppDispatch()

  const getIcon = () => {
    if (text === 'Profile') return <FaUserLarge />
    if (text === 'Password') return <FaLock />
    if (text === 'Posts') return <BsFileEarmarkPost />
    if (text === 'Reviews') return <FaEdit />
  }

  const handleClick = () => {
    dispatch(setActiveScreen(text))
  }

  return (
    <li>
      <button
        className={cn(classes.btn, { [classes.active]: activeItem === text })}
        onClick={handleClick}
      >
        {getIcon()}
        {text}
      </button>
    </li>
  )
})

export { ProfileMenuItem }
