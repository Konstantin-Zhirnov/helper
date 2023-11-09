export type PostsStateType = {
  posts: PostType[]
  postsByUser: PostType[]
  location: string
  locations: LocationsType
  skip: number
  limit: number
  count: number
  pages: number
  message: string
  isModal: boolean
}


export type PostsQueryType = {
  location: string
  skip: number
  limit: number
}

type AuthorIdType = {
  _id: string
  name: string
  email: string
  phone: string
  whatsapp: string
  telegram: string
  viber: string
  photo: string
}

export type PostType = {
  _id: string
  title: string
  description: string
  location: string
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

export type PaginationType = {
  skip: number
  limit: number
}

export type LocationsType = string[]

export type ReasonType = 'all' | 'profile'