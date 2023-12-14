import { UserType } from '../../../shared'

export type ProfileStateType = {
  user: UserType
  isReload: boolean
  message: string
  alertMessage: string
}

export type NewPasswordType = Record<'password' | '_id', string>

export type UpdateUserType = { _id: string, fieldName: string, value: string | boolean }

export type UpdateUserResponseType = {
  fieldName: string
  value: string | boolean
}
