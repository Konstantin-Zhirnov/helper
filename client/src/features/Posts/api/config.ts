import axios from 'axios'

const BaseURL = 'https://helper.plus:8000/api'
// const BaseURL = 'http://localhost:8000/api'

export const URL = {
  posts: BaseURL + '/posts',
  cities: BaseURL + '/cities',
  addPost: BaseURL + '/create-post',
  updatePost: BaseURL + '/update-post',
  addImages: BaseURL + '/add-images',
  removeImage: BaseURL + '/remove-image',
  removePost: BaseURL + '/remove-post',
}

const $api = axios.create({ withCredentials: true })

export { $api }
