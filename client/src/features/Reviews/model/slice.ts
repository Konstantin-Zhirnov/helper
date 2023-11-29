import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchUser } from './asyncActions'
import { ReviewsStateType, UserType } from '../types'
import { RootState } from '../../../app'


const initialState: ReviewsStateType = {
  user: {
    name: '',
    photo: '',
    stars: 0,
    countReviews: 0,
  },
  reviews: [],
  message: '',
}

export const reviews = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, pending)
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })
  },
})

function pending(state: ReviewsStateType) {
  state.message = ''
}


// export const { setLocation } = reviews.actions
export const getUser = (state: RootState): UserType => state.reviews.user

export default reviews.reducer
