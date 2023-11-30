import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchAddReview, fetchUser } from './asyncActions'
import { ReviewsStateType, ReviewType, UserType } from '../types'
import { RootState } from '../../../app'


const initialState: ReviewsStateType = {
  user: {
    name: '',
    photo: '',
    stars: 0,
    countReviews: 0,
  },
  reviews: [],
  isModal: false,
  message: '',
  alertMessage: '',
}

export const reviews = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<boolean>) => {
      state.isModal = action.payload
    },
    setAlertReviewsMessage: (state, action: PayloadAction<string>) => {
      state.alertMessage = action.payload
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, pending)
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.user = action.payload
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchAddReview.pending, pending)
      .addCase(fetchAddReview.fulfilled, (state, action: PayloadAction<ReviewType>) => {
        state.reviews.unshift(action.payload)
        state.isModal = false
      })
      .addCase(fetchAddReview.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })
  },
})

function pending(state: ReviewsStateType) {
  state.message = ''
}


export const { setModal, setMessage, setAlertReviewsMessage } = reviews.actions
export const getUser = (state: RootState): UserType => state.reviews.user
export const getModal = (state: RootState): boolean => state.reviews.isModal
export const getMessage = (state: RootState): string => state.reviews.message

export default reviews.reducer
