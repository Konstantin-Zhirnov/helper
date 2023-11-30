export type AuthorizationStateType = {
  isAuth: boolean
  isLoginModal: boolean
  loginErrorMessage: string
  registrationErrorMessage: string
  isRegistered: boolean
  sendEmailMessage: string
  sendEmailReason: SendEmailReasonType
  changePasswordMessage: string
  message: string
  alertMessage: string
}

export type SendEmailReasonType = 'password' | 'activation' | ''

export type LoginType = Record<'email' | 'password', string>

export type EmailType = {
  email: string
}

export type SendEmailType = {
  reason: SendEmailReasonType
  email: string
}

export type ChangePasswordType = Record<'password' | 'link', string>


export type LinkType = { link: string }