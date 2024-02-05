import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { RootState } from '../../../shared'
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
  category: '',
  page: 1,
  count: 0,
  pages: 0,
  isModal: '',
  message: '',
  alertMessage: '',
  searchComponentLocation: '',
  searchComponentSearch: '',
  isMainSearch: false,
  isLoading: false,
  searchButtonLoading: false,
}

export const posts = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload
      state.page = 1
    },
    setModal: (state, action: PayloadAction<string>) => {
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
    setCategory: (state, action: PayloadAction<string>) => {
      if (state.category === action.payload) {
        state.category = ''
      } else {
        state.category = action.payload
      }
    },
    clearPages: (state) => {
      state.posts = []
      state.page = 1
    },
    setSearchComponentLocation: (state, action: PayloadAction<string>) => {
      state.searchComponentLocation = action.payload
    },
    setSearchComponentSearch: (state, action: PayloadAction<string>) => {
      state.searchComponentSearch = action.payload
    },
    setDataForSearch: (state) => {
      if (
        state.search !== state.searchComponentSearch ||
        (state.searchComponentLocation && state.location !== state.searchComponentLocation)
      ) {
        state.searchButtonLoading = true
      }
      if (state.search !== state.searchComponentSearch) {
        state.search = state.searchComponentSearch
        state.page = 1
        state.isMainSearch = true
      }
      if (state.searchComponentLocation && state.location !== state.searchComponentLocation) {
        state.location = state.searchComponentLocation
        localStorage.setItem('location', state.searchComponentLocation)
        state.page = 1
      }
    },
    setMainSearch: (state, action: PayloadAction<boolean>) => {
      state.isMainSearch = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, pendingWithLoading)
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostsType>) => {
        if (action.payload.page === 1) {
          state.posts = action.payload.posts
        } else {
          state.posts = state.posts.concat(action.payload.posts)
        }
        state.count = action.payload.count
        state.pages = action.payload.pages
        state.isLoading = false
        state.searchButtonLoading = false
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
        state.isLoading = false
        state.searchButtonLoading = false
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
        state.isModal = ''
        document.body.style.overflow = 'auto'
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
      .addCase(fetchUpdatePost.fulfilled, postFulfilled)
      .addCase(fetchUpdatePost.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchAddImages.pending, pendingWithLoading)
      .addCase(fetchAddImages.fulfilled, postFulfilled)
      .addCase(fetchAddImages.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
        state.isLoading = false
      })

      .addCase(fetchRemoveImage.pending, pending)
      .addCase(fetchRemoveImage.fulfilled, postFulfilled)
      .addCase(fetchRemoveImage.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchRemovePost.pending, pending)
      .addCase(fetchRemovePost.fulfilled, (state, action: PayloadAction<{ _id: string }>) => {
        state.postsByUser = state.postsByUser.filter((post) => post._id !== action.payload._id)
        state.posts = state.posts.filter((post) => post._id !== action.payload._id)
        state.alertMessage = 'Your post has been successfully deleted!'
      })
      .addCase(fetchRemovePost.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })
  },
})

function pending(state: PostsStateType) {
  state.message = ''
}

function pendingWithLoading(state: PostsStateType) {
  state.message = ''
  state.isLoading = true
}

function postFulfilled(state: PostsStateType, action: PayloadAction<UpdatePostType>) {
  state.postsByUser = state.postsByUser.map((post) => {
    if (post._id === action.payload._id) {
      return { ...post, ...action.payload.field }
    }
    return post
  })
  state.posts = state.posts.map((post) => {
    if (post._id === action.payload._id) {
      return { ...post, ...action.payload.field }
    }
    return post
  })
  state.isLoading = false
}

export const {
  setLocation,
  setModal,
  setAlertPostsMessage,
  setMessage,
  setPage,
  setSearch,
  clearPages,
  setDataForSearch,
  setSearchComponentLocation,
  setSearchComponentSearch,
  setMainSearch,
  setCategory,
} = posts.actions

export const getPosts = (state: RootState): PostType[] => state.posts.posts
export const getPostsByUser = (state: RootState): PostType[] => state.posts.postsByUser
export const getPage = (state: RootState): number => state.posts.page
export const getPages = (state: RootState): number => state.posts.pages
export const getSearch = (state: RootState): string => state.posts.search
export const getLocation = (state: RootState): string => state.posts.location
export const getLocations = (state: RootState): LocationsType => state.posts.locations
export const getPostsModal = (state: RootState): string => state.posts.isModal
export const getMessage = (state: RootState): string => state.posts.message
export const getAlertPostsMessage = (state: RootState): string => state.posts.alertMessage
export const getIsPostsByUser = (state: RootState): boolean =>
  Boolean(state.posts.postsByUser.length)
export const getSearchComponentSearch = (state: RootState): string =>
  state.posts.searchComponentSearch
export const getSearchComponentLocation = (state: RootState): string =>
  state.posts.searchComponentLocation
export const getMainSearch = (state: RootState): boolean => state.posts.isMainSearch
export const getCategory = (state: RootState): string => state.posts.category
export const getPostsLoading = (state: RootState): boolean => state.posts.isLoading
export const getSearchButtonLoading = (state: RootState): boolean => state.posts.searchButtonLoading

export default posts.reducer
