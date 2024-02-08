import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { PostsAPI } from '../api'
import { PostsQueryType, RemoveImageType, RemovePostType, UpdatePostType } from '../types'

export const fetchPosts = createAsyncThunk(
  'authorization/fetchPosts',
  async function (query: PostsQueryType, { rejectWithValue }) {
    try {
      return await PostsAPI.getPosts(query)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchLocations = createAsyncThunk(
  'authorization/fetchLocations',
  async function (_, { rejectWithValue }) {
    try {
      return await PostsAPI.getCities()
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchAddPost = createAsyncThunk(
  'authorization/fetchAddPost',
  async function (body: FormData, { rejectWithValue }) {
    try {
      return await PostsAPI.addPost(body)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchPostsByUser = createAsyncThunk(
  'authorization/fetchPostsByUser',
  async function (id: string, { rejectWithValue }) {
    try {
      return await PostsAPI.getPostsByUser(id)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchUpdatePost = createAsyncThunk(
  'authorization/fetchUpdatePost',
  async function (body: UpdatePostType, { rejectWithValue }) {
    try {
      return await PostsAPI.updatePost(body)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchAddImages = createAsyncThunk(
  'authorization/fetchAddImages',
  async function (body: FormData, { rejectWithValue }) {
    try {
      return await PostsAPI.addImages(body)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchRemoveImage = createAsyncThunk(
  'authorization/fetchRemoveImage',
  async function (body: RemoveImageType, { rejectWithValue }) {
    try {
      return await PostsAPI.removeImage(body)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchRemovePost = createAsyncThunk(
  'authorization/fetchRemovePost',
  async function (body: RemovePostType, { rejectWithValue }) {
    try {
      return await PostsAPI.removePost(body)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)
