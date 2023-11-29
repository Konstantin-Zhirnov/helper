export type ReviewsStateType = {
  user: UserType
  reviews: ReviewType[]
  message: string
}

export type ReviewType = {
  _id: string
}

export type UserType = {
  name: string
  photo: string
  stars: number
  countReviews: number
}