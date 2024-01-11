import React from 'react'

import { ProfileMenuItem, ProfileMenuType} from '../../features'
import { profileMenu } from '../../shared'


import classes from './ProfileMenu.module.sass'


interface IProps {
  activeItem: ProfileMenuType
}

const ProfileMenu: React.FC<IProps> = React.memo(({activeItem}) => {

  const renderItem = (item: ProfileMenuType) => (
      <ProfileMenuItem key={item} text={item} activeItem={activeItem} />
  )

  return (
    <ul className={classes.container}>
      {
        profileMenu.map(renderItem)
      }
    </ul>
  )
})

export { ProfileMenu }