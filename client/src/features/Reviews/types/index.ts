export type ReviewsStateType = {
  user: UserType
  reviews: ReviewType[]
  reviewsByAuthor: ReviewType[]
  isModal: boolean
  page: number
  count: number
  pages: number
  message: string
  alertMessage: string
}

export type ReviewType = {
  _id: string
  title: string
  description: string
  stars: number
  images: string[]
  authorId: PersonType
  userId: PersonType
  time: number
}


type PersonType = {
  _id: string
  name: string
  photo: string
}

export type UserType = {
  name: string
  photo: string
  stars: number
  countReviews: number
}

export type CreateReviewType = {
  title: string
  description: string
  authorId: string
  userId: string
}

export type AllReviewsByUserIdType = {
  id: string
  page: number
}

export type AllReviewsByUserIdResponseType = {
  reviews: ReviewType[]
  count: number
  page: number
  pages: number
}

export type ReasonReviewType = 'all' | 'user'

export type RemoveReviewType = {
  _id: string
  userId: string
  authorId: string
  stars: number
}