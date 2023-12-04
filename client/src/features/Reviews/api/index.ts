import { $api, URL } from './config'
import { AllReviewsByUserIdResponseType, AllReviewsByUserIdType, ReviewType, UserType } from '../types'


export const ReviewsAPI = {
  getUser(_id: string): Promise<UserType> {
    return $api.get(`${URL.user}/${_id}`).then(({ data }) => data)
  },

  addReview(body: FormData): Promise<ReviewType> {
    return $api.post(URL.addReview, body).then(({ data }) => data)
  },

  getAllReviewsByUserId(query: AllReviewsByUserIdType): Promise<AllReviewsByUserIdResponseType> {
    return $api.get(`${URL.reviews}?id=${query.id}&page=${query.page}`).then(({ data }) => data)
  },
}
