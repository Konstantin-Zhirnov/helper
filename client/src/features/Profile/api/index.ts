import { $api, URL } from './config'
import type { NewPasswordType, UpdateUserResponseType, UpdateUserType } from '../types'
import type { MessageResponseType } from '../../../shared'

export const ProfileAPI = {
  changeAvatar(data: FormData): Promise<UpdateUserResponseType> {
    return $api.post(URL.changeAvatar, data).then(({ data }) => data)
  },

  updateUser(body: UpdateUserType): Promise<UpdateUserResponseType> {
    return $api.put(`${URL.users}/${body._id}`, {
      updateFieldObject: body.field,
      fieldName: body.fieldName,
    }).then(({ data }) => data)
  },

  newPassword(body: NewPasswordType): Promise<MessageResponseType> {
    return $api.put(URL.newPassword, body).then(({ data }) => data)
  },

  removeUser(_id: string): Promise<MessageResponseType> {
    return $api.delete(`${URL.removeUser}/${_id}`).then(({ data }) => data)
  },
}
