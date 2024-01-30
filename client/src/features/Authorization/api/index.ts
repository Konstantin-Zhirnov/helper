import { $api, URL } from './config'
import type { ChangePasswordType, LinkType, LoginType, SendEmailType } from '../types'

import type { MessageResponseType, UserType } from '../../../shared'

export const AuthAPI = {
  login(obj: LoginType): Promise<UserType> {
    return $api.post(URL.login, obj).then(({ data }) => data)
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

  logout(): Promise<MessageResponseType> {
    return $api.post(URL.logout).then(({ data }) => data)
  },

  sendEmail(body: SendEmailType): Promise<MessageResponseType> {
    return $api
      .post(body.reason === 'password' ? URL.sendEmailForPassword : URL.sendEmailForActivation, {
        email: body.email,
      })
      .then(({ data }) => data)
  },
}
