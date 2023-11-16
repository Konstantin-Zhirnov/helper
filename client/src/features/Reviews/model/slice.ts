import { createSlice } from '@reduxjs/toolkit'


import { ReviewsStateType } from '../types'


const initialState: ReviewsStateType = {
  reviews: [],
  message: '',
}

export const reviews = createSlice({
  name: 'reviews',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder
    //   .addCase(fetchPosts.pending, pending)
    //   .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<PostsType>) => {
    //     if (action.payload.page === 1) {
    //       state.posts = action.payload.posts
    //     } else {
    //       state.posts = state.posts.concat(action.payload.posts)
    //     }
    //     state.count = action.payload.count
    //     state.pages = action.payload.pages
    //   })
    //   .addCase(fetchPosts.rejected, (state, action) => {
    //     state.message = (action.payload as string) ?? ''
    //   })
  },
})

function pending(state: ReviewsStateType) {
  state.message = ''
}


// export const { setLocation } = reviews.actions


export default reviews.reducer
