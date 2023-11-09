import authorizationReducer, {
  clearSendEmail,
  getAlertMessage,
  getAuth,
  getChangePasswordMessage,
  getIsActivated,
  getIsLoading,
  getMessage,
  getRegistered,
  getRegistrationErrorMessage,
  getSendEmailMessage,
  getSendEmailReason,
  getUser,
  setAlertMessage,
} from './Authorization/model/slice'
import { fetchConfirmation, fetchSendEmail, fetchUser } from './Authorization/model/asyncActions'
import { LoginForm } from './Authorization/components/Authorization/Login/LoginForm'
import { RegistrationForm } from './Authorization/components/RegistrationForm'
import { PasswordChanging } from './Authorization/components/PasswordChanging'
import { Authorization } from './Authorization/components/Authorization'
import { SendToEmail } from './Authorization/components/SendToEmail'
import { EmailType } from './Authorization/types'

import { EditablePasswordInput } from './Profile/components/EditablePasswordInput'
import { ProfileAvatar } from './Profile/components/ProfileAvatar'
import { EditableInput } from './Profile/components/EditableInput'

import postsReducer, { getLimit, getLocation, getPosts, getPostsByUser, getSkip } from './Posts/model/slice'
import { fetchPosts, fetchPostsByUser } from './Posts/model/asyncActions'
import { Location } from './Posts/components/Location'
import { AddPost } from './Posts/components/AddPost'
import { Post } from './Posts/components/Post'
import { PostType, ReasonType } from './Posts/types'

export {
  authorizationReducer, clearSendEmail,
  getAlertMessage,
  getAuth,
  getChangePasswordMessage,
  getIsActivated,
  getIsLoading,
  getMessage,
  getRegistered,
  getRegistrationErrorMessage,
  getSendEmailMessage,
  getSendEmailReason,
  getUser,
  setAlertMessage,
}
export { fetchConfirmation, fetchSendEmail, fetchUser }
export { Authorization, LoginForm, RegistrationForm, SendToEmail, PasswordChanging }
export type { EmailType }


export { ProfileAvatar, EditablePasswordInput, EditableInput }
export { postsReducer, getLimit, getLocation, getPosts, getPostsByUser, getSkip }
export { fetchPosts, fetchPostsByUser }
export { Location, AddPost, Post }
export type { PostType, ReasonType }

