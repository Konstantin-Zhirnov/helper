import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  fetchConfirmation,
  fetchLogin,
  fetchLogout,
  fetchRegistration,
  fetchSendEmail,
  fetchUser,
} from './asyncActions'
import {AuthorizationStateType, ModalType, SendEmailReasonType} from '../types'
import type { MessageResponseType, RootState, UserType } from '../../../shared'

const initialState: AuthorizationStateType = {
  isAuth: false,
  isModal: '',
  loginErrorMessage: '',
  registrationErrorMessage: '',
  isRegistered: false,
  sendEmailMessage: '',
  sendEmailReason: '',
  message: '',
  alertMessage: '',
  isMobileMenu: false
}

export const authorization = createSlice({
  name: 'authorization',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<ModalType>) => {
      state.isModal = action.payload
    },
    clearSendEmail: (state) => {
      state.sendEmailReason = ''
      state.sendEmailMessage = ''
    },
    goToSendEmailPage: (state, action: PayloadAction<SendEmailReasonType>) => {
      state.sendEmailReason = action.payload
      state.isModal = ''
    },
    setAlertAuthorizationMessage: (state, action: PayloadAction<string>) => {
      state.alertMessage = action.payload
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload
    },
    setMobileMenu: (state, action: PayloadAction<boolean>) => {
      state.isMobileMenu = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, pendingLogin)
      .addCase(fetchLogin.fulfilled, (state) => {
        state.loginErrorMessage = ''
        state.isModal = ''
        document.body.style.overflow = 'auto'
        state.isAuth = true
        if (state.isMobileMenu) {
          state.isMobileMenu = false
        }
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loginErrorMessage = (action.payload as string) ?? ''
      })

      .addCase(fetchRegistration.pending, pendingRegistration)
      .addCase(fetchRegistration.fulfilled, (state) => {
        state.isRegistered = true
        if (state.isMobileMenu) {
          state.isMobileMenu = false
        }
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
        if (state.isMobileMenu) {
          state.isMobileMenu = false
        }
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



export const {
  setModal,
  clearSendEmail,
  goToSendEmailPage,
  setAlertAuthorizationMessage,
  setIsAuth,
  setMobileMenu
} = authorization.actions

export const getAuth = (state: RootState): boolean => state.authorization.isAuth
export const getLoginErrorMessage = (state: RootState): string => state.authorization.loginErrorMessage
export const getModal = (state: RootState): ModalType => state.authorization.isModal
export const getRegistered = (state: RootState): boolean => state.authorization.isRegistered
export const getSendEmailReason = (state: RootState): SendEmailReasonType => state.authorization.sendEmailReason
export const getSendEmailMessage = (state: RootState): string =>
  state.authorization.sendEmailMessage
export const getRegistrationErrorMessage = (state: RootState): string =>
  state.authorization.registrationErrorMessage
export const getAlertAuthorizationMessage = (state: RootState): string => state.authorization.alertMessage
export const getMobileMenu = (state: RootState): boolean => state.authorization.isMobileMenu


export default authorization.reducer
