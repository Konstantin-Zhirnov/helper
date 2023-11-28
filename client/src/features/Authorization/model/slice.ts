import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  fetchChangeAvatar,
  fetchChangePassword,
  fetchConfirmation,
  fetchLogin,
  fetchLogout,
  fetchNewPassword,
  fetchRegistration,
  fetchRemoveUser,
  fetchSendEmail,
  fetchUpdateUser,
  fetchUser,
} from './asyncActions'
import { AuthorizationStateType, MessageResponseType, SendEmailReasonType, UserType } from '../types'
import { RootState } from '../../../app'

const initialState: AuthorizationStateType = {
  isAuth: false,
  message: '',
  isLoading: false,
  isLoginModal: false,
  loginErrorMessage: '',
  registrationErrorMessage: '',
  alertMessage: '',
  isRegistered: false,
  sendEmailMessage: '',
  sendEmailReason: '',
  changePasswordMessage: '',
  isNewAvatar: false,
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
    paid: false,
    paidTime: '',
  },
}

export const authorization = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setLoginModal: (state, action: PayloadAction<boolean>) => {
      state.isLoginModal = action.payload
    },
    clearSendEmail: (state) => {
      state.sendEmailReason = ''
      state.sendEmailMessage = ''
    },
    goToSendEmailPage: (state, action: PayloadAction<SendEmailReasonType>) => {
      state.sendEmailReason = action.payload
      state.isLoginModal = false
    },
    setAlertMessage: (state, action: PayloadAction<string>) => {
      state.alertMessage = action.payload
    },
    setIsNewAvatar: (state, action: PayloadAction<boolean>) => {
      state.isNewAvatar = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, pendingLogin)
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loginErrorMessage = ''
        state.isLoginModal = false
        state.user = action.payload
        state.isAuth = true
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loginErrorMessage = (action.payload as string) ?? ''
      })

      .addCase(fetchRegistration.pending, pendingRegistration)
      .addCase(fetchRegistration.fulfilled, (state) => {
        state.isRegistered = true
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.registrationErrorMessage = (action.payload as string) ?? ''
      })

      .addCase(fetchConfirmation.pending, pending)
      .addCase(fetchConfirmation.fulfilled, (state) => {
        state.user.isActivated = true
      })
      .addCase(fetchConfirmation.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchUser.pending, pending)
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserType>) => {
        state.user = action.payload
        if (action.payload.isActivated) {
          state.isAuth = true
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isAuth = false
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchLogout.pending, pending)
      .addCase(fetchLogout.fulfilled, (state) => {
        state.isAuth = false
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchSendEmail.pending, pendingSendEmail)
      .addCase(fetchSendEmail.fulfilled, (state, action: PayloadAction<MessageResponseType>) => {
        state.sendEmailMessage = action.payload.message
        state.sendEmailReason = ''
      })
      .addCase(fetchSendEmail.rejected, (state, action) => {
        state.sendEmailMessage = (action.payload as string) ?? ''
      })

      .addCase(fetchChangePassword.pending, pendingChangePassword)
      .addCase(fetchChangePassword.fulfilled, (state, action: PayloadAction<MessageResponseType>) => {
        state.changePasswordMessage = action.payload.message
      })
      .addCase(fetchChangePassword.rejected, (state, action) => {
        state.changePasswordMessage = (action.payload as string) ?? ''
      })

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
      .addCase(fetchNewPassword.fulfilled, (state, action: PayloadAction<MessageResponseType>) => {
        state.alertMessage = action.payload.message
      })
      .addCase(fetchNewPassword.rejected, (state, action) => {
        state.alertMessage = (action.payload as string) ?? ''
      })

      .addCase(fetchRemoveUser.pending, pendingNewPassword)
      .addCase(fetchRemoveUser.fulfilled, (state, action: PayloadAction<MessageResponseType>) => {
        state.isAuth = false
        window.location.href = '/'
      })
      .addCase(fetchRemoveUser.rejected, (state, action) => {
        state.alertMessage = (action.payload as string) ?? ''
      })
  },
})

function pending(state: AuthorizationStateType) {
  state.message = ''
}

function pendingLogin(state: AuthorizationStateType) {
  state.loginErrorMessage = ''
}

function pendingRegistration(state: AuthorizationStateType) {
  state.isRegistered = false
  state.registrationErrorMessage = ''
}

function pendingSendEmail(state: AuthorizationStateType) {
  state.sendEmailMessage = ''
}

function pendingChangePassword(state: AuthorizationStateType) {
  state.changePasswordMessage = ''
}

function pendingNewPassword(state: AuthorizationStateType) {
  state.alertMessage = ''
}


export const {
  setLoginModal,
  clearSendEmail,
  goToSendEmailPage,
  setAlertMessage,
  setIsNewAvatar,
} = authorization.actions

export const getAuth = (state: RootState): boolean => state.authorization.isAuth
export const getUser = (state: RootState): UserType => state.authorization.user
export const getMessage = (state: RootState): string => state.authorization.message
export const getLoginErrorMessage = (state: RootState): string => state.authorization.loginErrorMessage
export const getIsActivated = (state: RootState): boolean => state.authorization.user.isActivated
export const getIsLoading = (state: RootState): boolean => state.authorization.isLoading
export const getLoginModal = (state: RootState): boolean => state.authorization.isLoginModal
export const getRegistered = (state: RootState): boolean => state.authorization.isRegistered
export const getSendEmailReason = (state: RootState): SendEmailReasonType => state.authorization.sendEmailReason
export const getSendEmailMessage = (state: RootState): string =>
  state.authorization.sendEmailMessage
export const getChangePasswordMessage = (state: RootState): string =>
  state.authorization.changePasswordMessage
export const getRegistrationErrorMessage = (state: RootState): string =>
  state.authorization.registrationErrorMessage
export const getPhoto = (state: RootState): string => state.authorization.user.photo
export const getName = (state: RootState): string => state.authorization.user.name
export const getUserId = (state: RootState): string => state.authorization.user._id
export const getAlertMessage = (state: RootState): string => state.authorization.alertMessage
export const getIsNewAvatar = (state: RootState): boolean => state.authorization.isNewAvatar


export default authorization.reducer
