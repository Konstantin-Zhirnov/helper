import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { ReviewsAPI } from '../api'

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