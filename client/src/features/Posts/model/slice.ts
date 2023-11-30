import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../../../app'
import {
  fetchAddImages,
  fetchAddPost,
  fetchLocations,
  fetchPosts,
  fetchPostsByUser,
  fetchRemoveImage,
  fetchRemovePost,
  fetchUpdatePost,
} from './asyncActions'

import { LocationsType, PostsStateType, PostsType, PostType, UpdatePostType } from '../types'


const initialState: PostsStateType = {
  posts: [],
  postsByUser: [],
  location: '',
  locations: [],
  search: '',
  page: 1,
  count: 0,
  pages: 0,
  isModal: false,
  message: '',
  alertMessage: '',
}

export const posts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload
      state.page = 1
    },
    setModal: (state, action: PayloadAction<boolean>) => {
      state.isModal = action.payload
    },
    setAlertPostsMessage: (state, action: PayloadAction<string>) => {
      state.alertMessage = action.payload
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, pending)
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostsType>) => {
        if (action.payload.page === 1) {
          state.posts = action.payload.posts
        } else {
          state.posts = state.posts.concat(action.payload.posts)
        }
        state.count = action.payload.count
        state.pages = action.payload.pages
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchLocations.pending, pending)
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.locations = action.payload
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchAddPost.pending, pending)
      .addCase(fetchAddPost.fulfilled, (state, action: PayloadAction<PostType>) => {
        if (action.payload.location === state.location) {
          state.posts.unshift(action.payload)
        }
        state.isModal = false
      })
      .addCase(fetchAddPost.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchPostsByUser.pending, pending)
      .addCase(fetchPostsByUser.fulfilled, (state, action: PayloadAction<PostType[]>) => {
        state.postsByUser = action.payload
      })
      .addCase(fetchPostsByUser.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchUpdatePost.pending, pending)
      .addCase(fetchUpdatePost.fulfilled, (state, action: PayloadAction<UpdatePostType>) => {
        state.postsByUser = state.postsByUser.map(post => {
          if (post._id === action.payload._id) {
            return { ...post, ...action.payload.field }
          }
          return post
        })
        state.posts = state.posts.map(post => {
          if (post._id === action.payload._id) {
            return { ...post, ...action.payload.field }
          }
          return post
        })
      })
      .addCase(fetchUpdatePost.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchAddImages.pending, pending)
      .addCase(fetchAddImages.fulfilled, (state, action: PayloadAction<UpdatePostType>) => {
        state.postsByUser = state.postsByUser.map(post => {
          if (post._id === action.payload._id) {
            return { ...post, ...action.payload.field }
          }
          return post
        })
        state.posts = state.posts.map(post => {
          if (post._id === action.payload._id) {
            return { ...post, ...action.payload.field }
          }
          return post
        })
      })
      .addCase(fetchAddImages.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchRemoveImage.pending, pending)
      .addCase(fetchRemoveImage.fulfilled, (state, action: PayloadAction<UpdatePostType>) => {
        state.postsByUser = state.postsByUser.map(post => {
          if (post._id === action.payload._id) {
            return { ...post, ...action.payload.field }
          }
          return post
        })
        state.posts = state.posts.map(post => {
          if (post._id === action.payload._id) {
            return { ...post, ...action.payload.field }
          }
          return post
        })
      })
      .addCase(fetchRemoveImage.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchRemovePost.pending, pending)
      .addCase(fetchRemovePost.fulfilled, (state, action: PayloadAction<{ _id: string }>) => {
        state.postsByUser = state.postsByUser.filter(post => post._id !== action.payload._id)
        state.posts = state.posts.filter(post => post._id !== action.payload._id)
      })
      .addCase(fetchRemovePost.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })
  },
})

function pending(state: PostsStateType) {
  state.message = ''
}


export const { setLocation, setModal, setAlertPostsMessage, setMessage, setPage, setSearch } = posts.actions

export const getPosts = (state: RootState): PostType[] => state.posts.posts
export const getPostsByUser = (state: RootState): PostType[] => state.posts.postsByUser
export const getPage = (state: RootState): number => state.posts.page
export const getPages = (state: RootState): number => state.posts.pages
export const getSearch = (state: RootState): string => state.posts.search
export const getLocation = (state: RootState): string => state.posts.location
export const getLocations = (state: RootState): LocationsType => state.posts.locations
export const getModal = (state: RootState): boolean => state.posts.isModal
export const getMessage = (state: RootState): string => state.posts.message
export const getAlertPostsMessage = (state: RootState): string => state.posts.alertMessage


export default posts.reducer
