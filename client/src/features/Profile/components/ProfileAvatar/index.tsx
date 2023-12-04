import React from 'react'
import { MdAddAPhoto } from 'react-icons/md'
import { Avatar } from '@chakra-ui/react'


import { getExtension, reduceImage, useAppDispatch, useAppSelector } from '../../../../shared'

import { fetchChangeAvatar } from '../../model/asyncActions'
import { getIsNewAvatar, setAlertProfileMessage } from '../../model/slice'

import classes from './ProfileAvatar.module.sass'


interface IProps {
  name: string
  photo: string
  id: string
}

const ProfileAvatar: React.FC<IProps> = React.memo(({ name, photo, id }) => {
  const dispatch = useAppDispatch()
  const isNewAvatar = useAppSelector(getIsNewAvatar)

  const [_, setReload] = React.useState(false)

  React.useEffect(() => {
    setReload(isNewAvatar)
  }, [isNewAvatar])

  const handleChange = (event) => {
    const file = event.target.files[0]
    const maxSize = 120

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
      <Avatar size='2xl' name={name} src={`${photo}?${new Date().getTime()}`} />
      <label htmlFor='avatar'><MdAddAPhoto className={classes.icon} /></label>
      <input type='file' id='avatar' className={classes.input} onChange={handleChange} accept='image/jpeg, image/png' />
    </div>
  )
})

export { ProfileAvatar }
