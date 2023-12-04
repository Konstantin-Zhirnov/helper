import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchChangeAvatar, fetchNewPassword, fetchRemoveUser, fetchUpdateUser } from './asyncActions'
import { ProfileStateType } from '../types'

import type { RootState, UserType } from '../../../shared'

const initialState: ProfileStateType = {
  user: {
    _id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    photo: '',
    whatsapp: '',
    telegram: '',
    viber: '',
    isActivated: false,
    linkForActivated: '',
    changePasswordLink: '',
    stars: 0,
    countReviews: 0,
    paid: false,
    paidTime: '',
  },
  isNewAvatar: false,
  alertMessage: '',
  message: '',
}

export const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload
    },
    setIsActivated: (state, action: PayloadAction<boolean>) => {
      state.user.isActivated = true
    },
    setAlertProfileMessage: (state, action: PayloadAction<string>) => {
      state.alertMessage = action.payload
    },
    setIsNewAvatar: (state, action: PayloadAction<boolean>) => {
      state.isNewAvatar = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChangeAvatar.pending, pending)
      .addCase(fetchChangeAvatar.fulfilled, (state, action) => {
        state.user.photo = action.payload.photo
        state.isNewAvatar = true
      })
      .addCase(fetchChangeAvatar.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchUpdateUser.pending, pending)
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchNewPassword.pending, pendingNewPassword)
      .addCase(fetchNewPassword.fulfilled, (state, action) => {
        state.alertMessage = action.payload.message
      })
      .addCase(fetchNewPassword.rejected, (state, action) => {
        state.alertMessage = (action.payload as string) ?? ''
      })

      .addCase(fetchRemoveUser.pending, pendingNewPassword)
      .addCase(fetchRemoveUser.fulfilled, () => {
        window.location.href = '/'
      })
      .addCase(fetchRemoveUser.rejected, (state, action) => {
        state.alertMessage = (action.payload as string) ?? ''
      })
  },
})

function pending(state: ProfileStateType) {
  state.message = ''
}

function pendingNewPassword(state: ProfileStateType) {
  state.alertMessage = ''
}


export const {
  setUser,
  setIsActivated,
  setAlertProfileMessage,
  setIsNewAvatar,
} = profile.actions


export const getUser = (state: RootState): UserType => state.profile.user
export const getIsActivated = (state: RootState): boolean => state.profile.user.isActivated
export const getPhoto = (state: RootState): string => state.profile.user.photo
export const getName = (state: RootState): string => state.profile.user.name
export const getUserId = (state: RootState): string => state.profile.user._id
export const getAlertProfileMessage = (state: RootState): string => state.profile.alertMessage
export const getIsNewAvatar = (state: RootState): boolean => state.profile.isNewAvatar


export default profile.reducer
