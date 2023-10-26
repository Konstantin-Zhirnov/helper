import authorizationReducer from './Authorization/model/slice'
export { authorizationReducer }

import { getMessage } from './Authorization/model/slice'
export { getMessage }

import { Authorization } from './Authorization/components/Authorization'
export { Authorization }

import { LoginForm } from './Authorization/components/Authorization/Login/LoginForm'
export { LoginForm }

import { RegistrationForm } from './Authorization/components/RegistrationForm'
export { RegistrationForm }

import { fetchUser, fetchConfirmation, fetchSendEmail } from './Authorization/model/asyncActions'
export { fetchUser, fetchConfirmation, fetchSendEmail }

import { EmailType } from './Authorization/types'
export type { EmailType }

import { SendToEmail } from './Authorization/components/SendToEmail'
export { SendToEmail }

import { PasswordChanging } from './Authorization/components/PasswordChanging'
export { PasswordChanging }

import { ProfileAvatar } from './Profile/components/ProfileAvatar'
export { ProfileAvatar }

import { EditablePasswordInput } from './Profile/components/EditablePasswordInput'
export { EditablePasswordInput }

import { EditableInput } from './Profile/components/EditableInput'
export { EditableInput }

import {
  getIsActivated,
  getIsLoading,
  getRegistered,
  getSendEmailMessage,
  getSendEmailReason,
  getChangePasswordMessage,
  getRegistrationErrorMessage,
  clearSendEmail,
  getUser,
  getAuth,
  getAlertMessage,
  setAlertMessage
} from './Authorization/model/slice'

export {
  getIsActivated,
  getIsLoading,
  getRegistered,
  getSendEmailMessage,
  getSendEmailReason,
  getChangePasswordMessage,
  getRegistrationErrorMessage,
  clearSendEmail,
  getUser,
  getAuth,
  getAlertMessage,
  setAlertMessage
}
