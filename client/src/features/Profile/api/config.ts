import axios from 'axios'

const BaseURL = 'https://helper.plus:5000/api'
// const BaseURL = 'http://localhost:5000/api'

export const URL = {
  users: BaseURL + '/users',
  changeAvatar: BaseURL + '/file',
  newPassword: BaseURL + '/new-password',
  removeUser: BaseURL + '/remove-user',
}

const $api = axios.create({ withCredentials: true })

export { $api }
