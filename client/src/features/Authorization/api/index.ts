import { $api, URL } from './config'
import {
  MessageResponseType,
  LoginType,
  UserType,
  LinkType,
  SendEmailType,
  ChangePasswordType, UpdateUserType, NewPasswordType,
} from '../types'

export const AuthAPI = {
  login(obj: LoginType): Promise<UserType> {
    return $api.post(URL.login, obj).then(({ data }) => data)
  },

  logout(): Promise<MessageResponseType> {
    return $api.post(URL.logout).then(({ data }) => data)
  },

  registration(obj: UserType): Promise<UserType> {
    return $api.post(URL.users, obj).then(({ data }) => data)
  },

  confirmation(body: LinkType): Promise<MessageResponseType> {
    return $api.post(URL.confirmation, body).then(({ data }) => data)
  },

  getUser(): Promise<UserType> {
    return $api.get(URL.user).then(({ data }) => data)
  },

  sendEmail(body: SendEmailType): Promise<MessageResponseType> {
    return $api.post(body.reason === 'password' ? URL.sendEmailForPassword :  URL.sendEmailForActivation, { email: body.email }).then(({ data }) => data)
  },

  changePassword(body: ChangePasswordType): Promise<MessageResponseType> {
    return $api.put(URL.changePassword, body).then(({ data }) => data)
  },

  changeAvatar(data: FormData): Promise<UserType> {
    return $api.post(URL.changeAvatar, data).then(({ data }) => data)
  },

  updateUser(body: UpdateUserType): Promise<UserType> {
    return $api.put(`${URL.users}/${body._id}`, body.field).then(({ data }) => data)
  },

  newPassword(body: NewPasswordType): Promise<MessageResponseType> {
    return $api.put(URL.newPassword, body).then(({ data }) => data)
  },
}
