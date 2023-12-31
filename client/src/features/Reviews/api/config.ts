import axios from 'axios'

const BaseURL = 'https://helper.plus:8000/api'
// const BaseURL = 'http://localhost:8000/api'

export const URL = {
  user: BaseURL + '/review-user',
  addReview: BaseURL + '/create-review',
  reviews: BaseURL + '/reviews',
  reviewsByAuthor: BaseURL + '/reviews-author',
  removeReview: BaseURL + '/remove-review',
}

const $api = axios.create({ withCredentials: true })

export { $api }
