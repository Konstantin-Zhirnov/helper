import { UserType } from '../../../shared'

export type ProfileStateType = {
  user: UserType
  isNewAvatar: boolean
  message: string
  alertMessage: string
}

export type SendEmailReasonType = 'password' | 'activation' | ''

export type MessageResponseType = {
  message: string
}

export type AvatarResponseType = {
  photo: string
}

export type NewPasswordType = Record<'password' | '_id', string>

export type UpdateUserType = { _id: string, field: { [key: string]: any } }
