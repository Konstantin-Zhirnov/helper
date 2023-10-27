import axios from 'axios'

const baseURL = `${process.env.SERVER_PATH}/api`

export const URL = {
  login: '/login',
  logout: '/logout',
  users: '/users',
  confirmation: '/confirmation',
  user: '/user',
  sendEmailForPassword :  '/password',
  sendEmailForActivation: '/activation',
  changePassword: '/change-password',
  changeAvatar: '/file',
  newPassword: '/new-password'
}

const $api = axios.create({
  withCredentials: true,
  baseURL
})

export { $api }
