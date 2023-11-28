import axios from 'axios'

const BaseURL = 'https://helper.plus:5000/api'
// const BaseURL = 'http://localhost:5000/api'

export const URL = {
  login: BaseURL + '/login',
  logout: BaseURL + '/logout',
  users: BaseURL + '/users',
  confirmation: BaseURL + '/confirmation',
  user: BaseURL + '/user',
  sendEmailForPassword: BaseURL + '/password',
  sendEmailForActivation: BaseURL + '/activation',
  changePassword: BaseURL + '/change-password',
  changeAvatar: BaseURL + '/file',
  newPassword: BaseURL + '/new-password',
  removeUser: BaseURL + '/remove-user',
}

const $api = axios.create({ withCredentials: true })

export { $api }
