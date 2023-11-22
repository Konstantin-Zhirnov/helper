import axios from 'axios'

// const BaseURL = 'https://helper.plus:8000/api'
const BaseURL = 'http://localhost:8000/api'

export const URL = {
  reviews: BaseURL + '/reviews',
}

const $api = axios.create({ withCredentials: true })

export { $api }