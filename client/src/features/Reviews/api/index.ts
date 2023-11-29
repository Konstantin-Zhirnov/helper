import { $api, URL } from './config'
import { UserType } from '../types'


export const ReviewsAPI = {
  getUser(_id: string): Promise<UserType> {
    return $api.get(`${URL.user}/${_id}`).then(({ data }) => data)
  },
}
