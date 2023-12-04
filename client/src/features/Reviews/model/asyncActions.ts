import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { ReviewsAPI } from '../api'
import { AllReviewsByUserIdType } from '../types'

export const fetchUser = createAsyncThunk(
  'reviews/fetchUser',
  async function(_id: string, { rejectWithValue }) {
    try {
      return await ReviewsAPI.getUser(_id)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchAddReview = createAsyncThunk(
  'reviews/fetchAddReview',
  async function(body: FormData, { rejectWithValue }) {
    try {
      return await ReviewsAPI.addReview(body)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchAllReviewsByUserId = createAsyncThunk(
  'reviews/fetchAllReviewsByUserId',
  async function(query: AllReviewsByUserIdType, { rejectWithValue }) {
    try {
      return await ReviewsAPI.getAllReviewsByUserId(query)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)
