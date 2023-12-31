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
  isReload: false,
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
    setIsReload: (state, action: PayloadAction<boolean>) => {
      state.isReload = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChangeAvatar.pending, pending)
      .addCase(fetchChangeAvatar.fulfilled, (state, action) => {
        state.user[`${action.payload.fieldName}`] = action.payload.value
        state.isReload = true
      })
      .addCase(fetchChangeAvatar.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchUpdateUser.pending, pending)
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.user[`${action.payload.fieldName}`] = action.payload.value
        state.isReload = true
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
  setIsReload,
} = profile.actions


export const getUser = (state: RootState): UserType => state.profile.user
export const getIsActivated = (state: RootState): boolean => state.profile.user.isActivated
export const getUserPhoto = (state: RootState): string => state.profile.user.photo
export const getUserPhone = (state: RootState): string => state.profile.user.phone
export const getUserName = (state: RootState): string => state.profile.user.name
export const getUserEmail = (state: RootState): string => state.profile.user.email
export const getUserId = (state: RootState): string => state.profile.user._id
export const getUserWhatsApp = (state: RootState): string => state.profile.user.whatsapp
export const getAlertProfileMessage = (state: RootState): string => state.profile.alertMessage
export const getIsReload = (state: RootState): boolean => state.profile.isReload


export default profile.reducer
