import React from 'react'
import { Avatar } from '@chakra-ui/react'
import { MdAddAPhoto } from 'react-icons/md'

import { useAppDispatch } from '../../../../app'
import { fetchChangeAvatar } from '../../../Authorization/model/asyncActions'
import { setAlertMessage } from '../../../Authorization/model/slice'

import classes from './ProfileAvatar.module.sass'

interface IProps {
  name: string
  photo: string
  id: string
}

const ProfileAvatar: React.FC<IProps> = ({name, photo, id}) => {
  const dispatch = useAppDispatch()

  const handleChange = (event) => {
    if (event.target.files[0].type === "image/jpeg" || event.target.files[0].type === "image/png") {
      if (event.target.files[0].size < 200000) {
        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        formData.append("id", id);
        dispatch(fetchChangeAvatar(formData))
      } else {
        dispatch(setAlertMessage('Select a file smaller than 200KB'))
      }
    } else {
      dispatch(setAlertMessage('Invalid extension of the selected file'))
    }

    event.target.value = null;
  }

  return (

      <div className={classes.container}>
          <Avatar size='2xl' name={name} src={photo} />
        <label htmlFor="avatar"><MdAddAPhoto className={classes.icon}/></label>
        <input type='file' id="avatar" className={classes.input} onChange={handleChange} accept="image/jpeg, image/png"/>
        </div>
  )
}

export { ProfileAvatar }
