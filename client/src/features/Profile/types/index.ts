import { profileMenu, UserType } from '../../../shared'

export type ProfileStateType = {
  user: UserType
  activeScreen: ProfileMenuType
  isReload: boolean
  changePasswordMessage: string
  message: string
  alertMessage: string
}

export type ProfileMenuType = typeof profileMenu[number];

export type NewPasswordType = Record<'password' | '_id', string>

export type UpdateUserType = { _id: string, fieldName: string, value: string | boolean }

export type UpdateUserResponseType = {
  fieldName: string
  value: string | boolean
}

export type CreatePaymentType = {
  id: string
  amount: number
}

export type CreatePaymentResponseType = {
  client_secret: string
}
