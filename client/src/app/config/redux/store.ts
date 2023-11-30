import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { authorizationReducer, postsReducer, profileReducer, reviewsReducer } from '../../../features'

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