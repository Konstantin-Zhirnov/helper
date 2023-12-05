import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  fetchAddReview,
  fetchAllReviewsByUserId,
  fetchRemoveReview,
  fetchReviewsByAuthor,
  fetchUser,
} from './asyncActions'
import type { ReviewsStateType, ReviewType, UserType } from '../types'
import { AllReviewsByUserIdResponseType } from '../types'
import type { RootState } from '../../../shared'


const initialState: ReviewsStateType = {
  user: {
    name: '',
    photo: '',
    stars: 0,
    countReviews: 0,
  },
  reviews: [],
  reviewsByAuthor: [],
  isModal: false,
  page: 1,
  count: 0,
  pages: 0,
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
    setReviewsPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
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
        state.user.stars = state.user.stars + action.payload.stars
        state.user.countReviews = state.user.countReviews + 1
      })
      .addCase(fetchAddReview.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchAllReviewsByUserId.pending, pending)
      .addCase(fetchAllReviewsByUserId.fulfilled, (state, action: PayloadAction<AllReviewsByUserIdResponseType>) => {
        state.reviews = action.payload.reviews
        state.count = action.payload.count
        state.pages = action.payload.pages
      })
      .addCase(fetchAllReviewsByUserId.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchReviewsByAuthor.pending, pending)
      .addCase(fetchReviewsByAuthor.fulfilled, (state, action: PayloadAction<ReviewType[]>) => {
        state.reviewsByAuthor = action.payload
      })
      .addCase(fetchReviewsByAuthor.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchRemoveReview.pending, pending)
      .addCase(fetchRemoveReview.fulfilled, (state, action: PayloadAction<{ _id: string }>) => {
        state.reviewsByAuthor = state.reviewsByAuthor.filter(review => review._id !== action.payload._id)
      })
      .addCase(fetchRemoveReview.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })
  },
})

function pending(state: ReviewsStateType) {
  state.message = ''
}


export const { setModal, setMessage, setAlertReviewsMessage, setReviewsPage } = reviews.actions
export const getUser = (state: RootState): UserType => state.reviews.user
export const getModal = (state: RootState): boolean => state.reviews.isModal
export const getMessage = (state: RootState): string => state.reviews.message
export const getReviewsPage = (state: RootState): number => state.reviews.page
export const getReviewsPages = (state: RootState): number => state.reviews.pages
export const getReviews = (state: RootState): ReviewType[] => state.reviews.reviews
export const getReviewsByAuthor = (state: RootState): ReviewType[] => state.reviews.reviewsByAuthor


export default reviews.reducer
