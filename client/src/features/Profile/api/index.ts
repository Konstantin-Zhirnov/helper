import { $api, URL } from './config'
import type { NewPasswordType, UpdateUserResponseType, UpdateUserType, CreatePaymentResponseType, CreatePaymentType } from '../types'
import type { MessageResponseType } from '../../../shared'
import {ChangePasswordType} from "../../Authorization/types";

export const ProfileAPI = {
  changeAvatar(data: FormData): Promise<UpdateUserResponseType> {
    return $api.post(URL.changeAvatar, data).then(({ data }) => data)
  },

  updateUser(body: UpdateUserType): Promise<UpdateUserResponseType> {
    return $api.put(URL.updateUser, {
      userId: body._id,
      fieldName: body.fieldName,
      value: body.value,
    }).then(({ data }) => data)
  },

  newPassword(body: NewPasswordType): Promise<MessageResponseType> {
    return $api.put(URL.newPassword, body).then(({ data }) => data)
  },

  removeUser(_id: string): Promise<MessageResponseType> {
    return $api.delete(`${URL.removeUser}/${_id}`).then(({ data }) => data)
  },

  createPayment(body: CreatePaymentType): Promise<CreatePaymentResponseType> {
    return $api.post(URL.createPayment, body).then(({ data }) => data)
  },

  changePassword(body: ChangePasswordType): Promise<MessageResponseType> {
    return $api.put(URL.changePassword, body).then(({ data }) => data)
  },
}
