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
  async getPosts(query: PostsQueryType): Promise<PostsType> {
    const { location, category, search, page } = query
    const url = `${URL.posts}?location=${location}&category=${encodeURIComponent(category)}&search=${search}&page=${page}`
    const { data } = await $api.get(url)
    return data
  },

  async getCities(): Promise<LocationsType> {
    const { data } = await $api.get(URL.cities)
    return data
  },

  async addPost(body: FormData): Promise<PostType> {
    const { data } = await $api.post(URL.addPost, body)
    return data
  },

  async getPostsByUser(id: string): Promise<PostType[]> {
    const { data } = await $api.get(`${URL.posts}/${id}`)
    return data
  },

  async updatePost(body: UpdatePostType): Promise<UpdatePostType> {
    const { data } = await $api.put(URL.updatePost, body)
    return data
  },

  async addImages(body: FormData): Promise<UpdatePostType> {
    const { data } = await $api.post(URL.addImages, body)
    return data
  },

  async removeImage(body: RemoveImageType): Promise<UpdatePostType> {
    const { data } = await $api.post(URL.removeImage, body)
    return data
  },

  async removePost(body: RemovePostType): Promise<{ _id: string }> {
    const { data } = await $api.post(URL.removePost, body)
    return data
  },
}
