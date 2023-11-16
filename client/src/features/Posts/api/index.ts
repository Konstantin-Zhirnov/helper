import { $api, URL } from './config'
import {
  LocationsType,
  PostsQueryType,
  PostsType,
  PostType,
  RemoveImageType,
  RemovePostType,
  UpdatePostType,
} from '../types'

export const PostsAPI = {
  getPosts(query: PostsQueryType): Promise<PostsType> {
    const { location, search, page } = query
    const url = `${URL.posts}?location=${location}&search=${search}&page=${page}`
    return $api.get(url).then(({ data }) => data)
  },

  getCities(): Promise<LocationsType> {
    return $api.get(URL.cities).then(({ data }) => data)
  },

  addPost(body: FormData): Promise<PostType> {
    return $api.post(URL.addPost, body).then(({ data }) => data)
  },

  getPostsByUser(id: string): Promise<PostType[]> {
    return $api.get(`${URL.posts}/${id}`).then(({ data }) => data)
  },

  updatePost(body: UpdatePostType): Promise<UpdatePostType> {
    return $api.put(URL.updatePost, body).then(({ data }) => data)
  },

  addImages(body: FormData): Promise<UpdatePostType> {
    return $api.post(URL.addImages, body).then(({ data }) => data)
  },

  removeImage(body: RemoveImageType): Promise<UpdatePostType> {
    return $api.post(URL.removeImage, body).then(({ data }) => data)
  },

  removePost(body: RemovePostType): Promise<{ _id: string }> {
    return $api.post(URL.removePost, body).then(({ data }) => data)
  },
}
