import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  fetchChangePassword,
  fetchConfirmation,
  fetchLogin,
  fetchLogout,
  fetchRegistration,
  fetchSendEmail,
  fetchUser,
} from './asyncActions'
import { AuthorizationStateType, SendEmailReasonType } from '../types'
import type { RootState } from '../../../app'
import type { MessageResponseType, UserType } from '../../../shared'

const initialState: AuthorizationStateType = {
  isAuth: false,
  isLoginModal: false,
  loginErrorMessage: '',
  registrationErrorMessage: '',
  isRegistered: false,
  sendEmailMessage: '',
  sendEmailReason: '',
  changePasswordMessage: '',
  message: '',
  alertMessage: '',
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
    setAlertAuthorizationMessage: (state, action: PayloadAction<string>) => {
      state.alertMessage = action.payload
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, pendingLogin)
      .addCase(fetchLogin.fulfilled, (state) => {
        state.loginErrorMessage = ''
        state.isLoginModal = false
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
      .addCase(fetchConfirmation.fulfilled, (state, action) => {
        state.message = action.payload
      })
      .addCase(fetchConfirmation.rejected, (state, action) => {
        state.message = (action.payload as string) ?? ''
      })

      .addCase(fetchUser.pending, pending)
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserType>) => {
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


export const {
  setLoginModal,
  clearSendEmail,
  goToSendEmailPage,
  setAlertAuthorizationMessage,
  setIsAuth,
} = authorization.actions

export const getAuth = (state: RootState): boolean => state.authorization.isAuth
export const getLoginErrorMessage = (state: RootState): string => state.authorization.loginErrorMessage
export const getLoginModal = (state: RootState): boolean => state.authorization.isLoginModal
export const getRegistered = (state: RootState): boolean => state.authorization.isRegistered
export const getSendEmailReason = (state: RootState): SendEmailReasonType => state.authorization.sendEmailReason
export const getSendEmailMessage = (state: RootState): string =>
  state.authorization.sendEmailMessage
export const getChangePasswordMessage = (state: RootState): string =>
  state.authorization.changePasswordMessage
export const getRegistrationErrorMessage = (state: RootState): string =>
  state.authorization.registrationErrorMessage
export const getAlertAuthorizationMessage = (state: RootState): string => state.authorization.alertMessage


export default authorization.reducer
