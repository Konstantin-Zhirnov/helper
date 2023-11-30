import authorizationReducer, {
  clearSendEmail,
  getAlertAuthorizationMessage,
  getAuth,
  getChangePasswordMessage,
  getRegistered,
  getRegistrationErrorMessage,
  getSendEmailMessage,
  getSendEmailReason,
  setAlertAuthorizationMessage,
  setIsAuth,
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
import { RemoveAccount } from './Profile/components/RemoveAccount'

import postsReducer, {
  getAlertPostsMessage,
  getLocation,
  getPage,
  getPages,
  getPosts,
  getPostsByUser,
  getSearch,
  setAlertPostsMessage,
  setLocation,
  setPage,
} from './Posts/model/slice'
import { fetchPosts, fetchPostsByUser } from './Posts/model/asyncActions'
import { Location } from './Posts/components/Location'
import { AddPost } from './Posts/components/AddPost'
import { Post } from './Posts/components/Post'
import { Search } from './Posts/components/Search'
import { PostType, ReasonType } from './Posts/types'

import reviewsReducer from './Reviews/model/slice'
import { UserInfo } from './Reviews/components/UserInfo'
import { AddReview } from './Reviews/components/AddReview'

import profileReducer, {
  getAlertProfileMessage,
  getIsActivated,
  getIsNewAvatar,
  getName,
  getPhoto,
  getUser,
  getUserId,
  setIsActivated,
  setIsNewAvatar,
  setUser,
} from './Profile/model/slice'

export {
  authorizationReducer,
  clearSendEmail,
  getAlertAuthorizationMessage,
  getAuth,
  getChangePasswordMessage,
  getRegistered,
  getRegistrationErrorMessage,
  getSendEmailMessage,
  getSendEmailReason,
  setAlertAuthorizationMessage,
  setIsAuth,
}
export { fetchConfirmation, fetchSendEmail, fetchUser }
export { Authorization, LoginForm, RegistrationForm, SendToEmail, PasswordChanging }
export type { EmailType }


export { ProfileAvatar, EditablePasswordInput, EditableInput, RemoveAccount }
export {
  postsReducer,
  getAlertPostsMessage,
  getSearch,
  getLocation,
  getPosts,
  getPostsByUser,
  getPage,
  getPages,
  setAlertPostsMessage,
  setPage,
  setLocation,
}
export { fetchPosts, fetchPostsByUser }
export { Location, AddPost, Post, Search }
export type { PostType, ReasonType }

export { reviewsReducer, UserInfo, AddReview }

export {
  profileReducer,
  getAlertProfileMessage,
  getIsActivated,
  getIsNewAvatar,
  getUser,
  getUserId,
  setIsActivated,
  setUser,
  setIsNewAvatar,
  getName, getPhoto,
}
