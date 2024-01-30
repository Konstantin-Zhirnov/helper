import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import authorizationReducer from '../../../features/Authorization/model/slice'
import postsReducer from '../../../features/Posts/model/slice'
import profileReducer from '../../../features/Profile/model/slice'
import reviewsReducer from '../../../features/Reviews/model/slice'

export const store = configureStore({
  reducer: {
    authorization: authorizationReducer,
    posts: postsReducer,
    reviews: reviewsReducer,
    profile: profileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
