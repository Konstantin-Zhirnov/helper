import React from 'react'

import {Avatar, getExtension, reduceImage, useAppDispatch, useAppSelector} from '../../../../shared'

import { fetchChangeAvatar } from '../../model/asyncActions'
import { getIsReload, getUserId, getUserPhoto, setAlertProfileMessage } from '../../model/slice'

import classes from './ProfileAvatar.module.sass'


const ProfileAvatar: React.FC = React.memo(() => {
  const dispatch = useAppDispatch()
  const isReload = useAppSelector(getIsReload)
  const photo = useAppSelector(getUserPhoto)
  const id = useAppSelector(getUserId)

  const [_, setReload] = React.useState(false)

  React.useEffect(() => {
    setReload(isReload)
  }, [isReload])

  const handleChange = (event) => {
    const file = event.target.files[0]
    const maxSize = 200

    if (file.type === 'image/jpeg' || file.type === 'image/png') {

      reduceImage(file, maxSize, function(reducedImage) {
        const name = `${id}.${getExtension(file.name)}`
        const formData = new FormData()
        formData.append('file', reducedImage, name)
        formData.append('id', id)
        dispatch(fetchChangeAvatar(formData))
      })
    } else {
      dispatch(setAlertProfileMessage('Invalid extension of the selected file'))
    }

    event.target.value = null
  }

  return (

    <div className={classes.container}>
      <Avatar photo={photo} isReload={isReload} size="md"/>

      <div>
        <h2 className={classes.title}>Avatar</h2>
        <p className={classes.text}>300x300 or larger recommended</p>
        <label htmlFor='avatar'>Upload new</label>
        <input type='file' id='avatar' className={classes.input} onChange={handleChange} accept='image/jpeg, image/png' />
      </div>

    </div>
  )
})

export { ProfileAvatar }
