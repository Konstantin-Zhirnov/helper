export type PostsStateType = {
  posts: PostType[]
  postsByUser: PostType[]
  location: string
  locations: LocationsType
  search: string
  category: string
  page: number
  count: number
  pages: number
  isModal: string
  alertMessage: string
  message: string
  searchComponentLocation: string
  searchComponentSearch: string
  isMainSearch: boolean
  isLoading: boolean
  searchButtonLoading: boolean
}

export type PostsQueryType = {
  location: string
  search: string
  page: number
  category: string
}

type AuthorIdType = {
  _id: string
  name: string
  email: string
  phone: string
  whatsapp: string
  telegram: string
  viber: string
  messenger: string
  photo: string
  stars: number
  countReviews: number
}

export type PostType = {
  _id: string
  title: string
  description: string
  location: string
  category: string
  authorId: AuthorIdType
  time: number
  images: string[]
}

export type CreatePostType = {
  title: string
  description: string
  location: string
  authorId: string
}

export type PostsType = {
  posts: PostType[]
  count: number
  pages: number
  page: number
}

export type UpdatePostType = {
  _id: string
  field: { [key: string]: any }
}

export type RemoveImageType = {
  _id: string
  image: string
  folder: string
}

export type RemovePostType = Omit<RemoveImageType, 'image'>

export type LocationsType = string[]

export type ReasonType = 'all' | 'profile'
