import { $api, URL } from './config'
import type { AvatarResponseType, NewPasswordType, UpdateUserType } from '../types'
import type { MessageResponseType, UserType } from '../../../shared'

export const ProfileAPI = {
  changeAvatar(data: FormData): Promise<AvatarResponseType> {
    return $api.post(URL.changeAvatar, data).then(({ data }) => data)
  },

  updateUser(body: UpdateUserType): Promise<UserType> {
    return $api.put(`${URL.users}/${body._id}`, body.field).then(({ data }) => data)
  },

  newPassword(body: NewPasswordType): Promise<MessageResponseType> {
    return $api.put(URL.newPassword, body).then(({ data }) => data)
  },

  removeUser(_id: string): Promise<MessageResponseType> {
    return $api.delete(`${URL.removeUser}/${_id}`).then(({ data }) => data)
  },
}
