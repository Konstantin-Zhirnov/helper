import { $api, URL } from './config'
import { ReviewType } from '../types'


export const ReviewsAPI = {
  getReviews(): Promise<ReviewType[]> {
    return $api.get(URL.reviews).then(({ data }) => data)
  },
}
