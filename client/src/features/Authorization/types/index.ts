export type AuthorizationStateType = {
  isAuth: boolean
  isModal: ModalType
  loginErrorMessage: string
  registrationErrorMessage: string
  isRegistered: boolean
  sendEmailMessage: string
  sendEmailReason: SendEmailReasonType
  message: string
  alertMessage: string
  isMobileMenu: boolean
  isLoading: boolean
}

export type ModalType = 'login' | 'registration' | 'registration-final' | ''

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