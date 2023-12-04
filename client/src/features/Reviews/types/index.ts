export type ReviewsStateType = {
  user: UserType
  reviews: ReviewType[]
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
  authorId: AuthorType
  userId: string
}

type AuthorType = {
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
  pages: number
}
