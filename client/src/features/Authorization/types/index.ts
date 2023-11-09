export type AuthorizationStateType = {
  isAuth: boolean
  message: string
  isLoading: boolean
  isLoginModal: boolean
  loginErrorMessage: string
  registrationErrorMessage: string
  alertMessage: string
  isRegistered: boolean
  sendEmailMessage: string
  sendEmailReason: SendEmailReasonType
  changePasswordMessage: string
  isNewAvatar: boolean
  user: UserType
}

export type SendEmailReasonType = 'password' | 'activation' | ''

export type LoginType = Record<'email' | 'password', string>

export type UserType = {
  _id: string
  name: string
  email: string
  password: string
  phone: string
  photo: string
  whatsapp: string
  telegram: string
  viber: string
  isActivated: boolean
  linkForActivated: string
  changePasswordLink: string
  paid: boolean
  paidTime: string
}

export type MessageResponseType = {
  message: string
}

export type AvatarResponseType = {
  photo: string
}

export type EmailType = {
  email: string
}

export type PasswordType = {
  password: string
  passwordConfirmation: string
}

export type SendEmailType = {
  reason: SendEmailReasonType
  email: string
}

export type ChangePasswordType = Record<'password' | 'link', string>

export type NewPasswordType = Record<'password' | '_id', string>

export type UpdateUserType = { _id: string, field: { [key: string]: any } }

export type LinkType = { link: string }