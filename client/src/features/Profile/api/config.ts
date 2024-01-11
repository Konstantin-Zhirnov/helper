import axios from 'axios'

const BaseURL = 'https://helper.plus:5000/api'
// const BaseURL = 'http://localhost:5000/api'

export const URL = {
  users: BaseURL + '/users',
  changeAvatar: BaseURL + '/file',
  updateUser: BaseURL + '/update-user',
  newPassword: BaseURL + '/new-password',
  removeUser: BaseURL + '/remove-user',
  createPayment: BaseURL + '/create-payment',
  changePassword: BaseURL + '/change-password',
}

const $api = axios.create({ withCredentials: true })

export { $api }
