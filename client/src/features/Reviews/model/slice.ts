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
  isModal: '',
  page: 1,
  count: 0,
  pages: 0,
  message: '',
  alertMessage: '',
  isLoading: false,
  isStarsErrorMessage: false,
  reviewsEmptyMessage: '',
}

export const reviews = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<string>) => {
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
    clearReviews: (state) => {
      state.reviews = []
      state.page = 1
    },
    setStarsErrorMessage: (state, action: PayloadAction<boolean>) => {
      state.isStarsErrorMessage = action.payload
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
        state.isModal = ''
        state.user.stars = state.user.stars + action.payload.stars
        state.user.countReviews = state.user.countReviews + 1
      })
      .addCase(fetchAddReview.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchAllReviewsByUserId.pending, pendingWithLoading)
      .addCase(
        fetchAllReviewsByUserId.fulfilled,
        (state, action: PayloadAction<AllReviewsByUserIdResponseType>) => {
          if (action.payload.page === 1 && !state.reviews.length) {
            state.reviews = action.payload.reviews
            if (!action.payload.reviews.length)
              state.reviewsEmptyMessage = 'There are no reviews about this user yet'
          } else {
            state.reviews = state.reviews.concat(action.payload.reviews)
          }
          state.count = action.payload.count
          state.pages = action.payload.pages
          state.isLoading = false
        },
      )
      .addCase(fetchAllReviewsByUserId.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
        state.isLoading = false
        state.reviewsEmptyMessage = ''
      })

      .addCase(fetchReviewsByAuthor.pending, pendingWithLoading)
      .addCase(fetchReviewsByAuthor.fulfilled, (state, action: PayloadAction<ReviewType[]>) => {
        state.reviewsByAuthor = action.payload
        if (!action.payload.length) state.reviewsEmptyMessage = 'You haven`t posted any reviews yet'
        state.isLoading = false
      })
      .addCase(fetchReviewsByAuthor.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
        state.isLoading = false
        state.reviewsEmptyMessage = ''
      })

      .addCase(fetchRemoveReview.pending, pending)
      .addCase(fetchRemoveReview.fulfilled, (state, action: PayloadAction<{ _id: string }>) => {
        const tempReviewsByAuthor = state.reviewsByAuthor.filter(
          (review) => review._id !== action.payload._id,
        )
        if (!tempReviewsByAuthor.length)
          state.reviewsEmptyMessage = 'You haven`t posted any reviews yet'
        state.reviewsByAuthor = tempReviewsByAuthor
        state.reviews = state.reviews.filter((review) => review._id !== action.payload._id)
        state.alertMessage = 'Your review has been successfully deleted!'
      })
      .addCase(fetchRemoveReview.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })
  },
})

function pending(state: ReviewsStateType) {
  state.message = ''
}
function pendingWithLoading(state: ReviewsStateType) {
  state.message = ''
  state.isLoading = true
  state.reviewsEmptyMessage = ''
}

export const {
  setModal,
  setMessage,
  setAlertReviewsMessage,
  setReviewsPage,
  clearReviews,
  setStarsErrorMessage,
} = reviews.actions

export const getUser = (state: RootState): UserType => state.reviews.user
export const getModal = (state: RootState): string => state.reviews.isModal
export const getMessage = (state: RootState): string => state.reviews.message
export const getReviewsPage = (state: RootState): number => state.reviews.page
export const getReviewsPages = (state: RootState): number => state.reviews.pages
export const getReviews = (state: RootState): ReviewType[] => state.reviews.reviews
export const getReviewsByAuthor = (state: RootState): ReviewType[] => state.reviews.reviewsByAuthor
export const getIsReviewsByAuthor = (state: RootState): boolean =>
  Boolean(state.reviews.reviewsByAuthor.length)
export const getReviewsLoading = (state: RootState): boolean => state.reviews.isLoading
export const getStarsErrorMessage = (state: RootState): boolean => state.reviews.isStarsErrorMessage
export const getReviewsEmptyMessage = (state: RootState): string =>
  state.reviews.reviewsEmptyMessage
export const getAlertReviewsMessage = (state: RootState): string => state.posts.alertMessage

export default reviews.reducer
