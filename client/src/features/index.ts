import { renderPostItem } from './lib/helpers'
export { renderPostItem }

// Authorization
import {
  clearSendEmail,
  getAlertAuthorizationMessage,
  getAuth,
  getRegistered,
  getRegistrationErrorMessage,
  getSendEmailMessage,
  getSendEmailReason,
  setAlertAuthorizationMessage,
  setIsAuth,
  getMobileMenu,
  setMobileMenu,
} from './Authorization/model/slice'
import { fetchConfirmation, fetchSendEmail, fetchUser } from './Authorization/model/asyncActions'
import { LoginForm } from './Authorization/components/Authorization/Login/LoginForm'
import { RegistrationForm } from './Authorization/components/Authorization/SignUp/RegistrationForm'
import { Authorization } from './Authorization/components/Authorization'
import { SendToEmail } from './Authorization/components/SendToEmail'
import { MobileMenuButton } from './Authorization/components/MobileMenuButton'
import { SignUp } from './Authorization/components/Authorization/SignUp'
import { EmailType } from './Authorization/types'

// Profile
import {
  getAlertProfileMessage,
  getIsActivated,
  getIsReload,
  getUser,
  getUserId,
  getUserName,
  getUserPhoto,
  setIsActivated,
  setIsReload,
  setUser,
  getActiveScreen,
  setActiveScreen,
  getChangePasswordMessage,
} from './Profile/model/slice'
import { PasswordChanging } from './Profile/components/PasswordChanging'
import { ProfileAvatar } from './Profile/components/ProfileAvatar'
import { NameField } from './Profile/components/NameField'
import { PhoneField } from './Profile/components/PhoneField'
import { WhatsAppField } from './Profile/components/WhatsAppField'
import { TelegramField } from './Profile/components/TelegramField'
import { RemoveAccount } from './Profile/components/RemoveAccount'
import { PaymentForm } from './Profile/components/PaymentForm'
import { ProfileMenuItem } from './Profile/components/ProfileMenuItem'
import { ProfileMenuType } from './Profile/types'

// Posts
import {
  clearPages,
  getAlertPostsMessage,
  getLocation,
  getPage,
  getPages,
  getPosts,
  getPostsByUser,
  getIsPostsByUser,
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
import { SearchComponent } from './Posts/components/SearchComponent'
import { Category } from './Posts/components/Category'
import { PostType, ReasonType } from './Posts/types'

// Reviews
import {
  clearReviews,
  getReviews,
  getReviewsByAuthor,
  getIsReviewsByAuthor,
  getReviewsPage,
  getReviewsPages,
  setReviewsPage,
} from './Reviews/model/slice'
import { fetchAllReviewsByUserId, fetchRemoveReview, fetchReviewsByAuthor } from './Reviews/model/asyncActions'
import { UserInfo } from './Reviews/components/UserInfo'
import { AddReview } from './Reviews/components/AddReview'
import { Review } from './Reviews/components/Review'
import type { ReasonReviewType, ReviewType } from './Reviews/types'


// Authorization
export {
  clearSendEmail,
  getAlertAuthorizationMessage,
  getAuth,
  getRegistered,
  getRegistrationErrorMessage,
  getSendEmailMessage,
  getSendEmailReason,
  setAlertAuthorizationMessage,
  setIsAuth,
  getMobileMenu,
  setMobileMenu,
}
export { fetchConfirmation, fetchSendEmail, fetchUser }
export { Authorization, LoginForm, RegistrationForm, SendToEmail, MobileMenuButton, SignUp }
export type { EmailType }

// Profile
export {
  getAlertProfileMessage,
  getIsActivated,
  getIsReload,
  getUser,
  getUserId,
  setIsActivated,
  setUser,
  setIsReload,
  getUserName,
  getUserPhoto,
  getActiveScreen,
  setActiveScreen,
  getChangePasswordMessage,
}
export {
  ProfileAvatar,
  PasswordChanging,
  NameField,
  PhoneField,
  WhatsAppField,
  TelegramField,
  RemoveAccount,
  PaymentForm,
  ProfileMenuItem
}
export type { ProfileMenuType }

// Posts
export {
  getAlertPostsMessage,
  clearPages,
  getSearch,
  getLocation,
  getPosts,
  getPostsByUser,
  getIsPostsByUser,
  getPage,
  getPages,
  setAlertPostsMessage,
  setPage,
  setLocation,
}
export { fetchPosts, fetchPostsByUser }
export { Location, AddPost, Post, Search, SearchComponent, Category }
export type { PostType, ReasonType }

// Reviews
export { fetchAllReviewsByUserId, fetchReviewsByAuthor, fetchRemoveReview }
export {
  getReviewsPage,
  getReviewsPages,
  setReviewsPage,
  getReviews,
  getReviewsByAuthor,
  getIsReviewsByAuthor,
  clearReviews,
}
export { UserInfo, AddReview, Review }
export type { ReviewType, ReasonReviewType }


