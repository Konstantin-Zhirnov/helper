import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { AuthAPI } from '../api'
import {
  ChangePasswordType,
  LinkType,
  LoginType,
  NewPasswordType,
  SendEmailType,
  UpdateUserType,
  UserType,
} from '../types'

export const fetchLogin = createAsyncThunk(
  'authorization/fetchLogin',
  async function(body: LoginType, { rejectWithValue }) {
    try {
      return await AuthAPI.login(body)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchRegistration = createAsyncThunk(
  'authorization/fetchRegistration',
  async function(body: UserType, { rejectWithValue }) {
    try {
      return await AuthAPI.registration(body)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchConfirmation = createAsyncThunk(
  'authorization/fetchConfirmation',
  async function(body: LinkType, { rejectWithValue }) {
    try {
      return await AuthAPI.confirmation(body)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchUser = createAsyncThunk(
  'authorization/fetchUser',
  async function(_, { rejectWithValue }) {
    try {
      return await AuthAPI.getUser()
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchLogout = createAsyncThunk(
  'authorization/fetchLogout',
  async function(_, { rejectWithValue }) {
    try {
      return await AuthAPI.logout()
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchSendEmail = createAsyncThunk(
  'authorization/fetchSendEmail',
  async function(body: SendEmailType, { rejectWithValue }) {
    try {
      return await AuthAPI.sendEmail(body)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchChangePassword = createAsyncThunk(
  'authorization/fetchChangePassword',
  async function(body: ChangePasswordType, { rejectWithValue }) {
    try {
      return await AuthAPI.changePassword(body)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchChangeAvatar = createAsyncThunk(
  'authorization/fetchChangeAvatar',
  async function(data: FormData, { rejectWithValue }) {
    try {
      return await AuthAPI.changeAvatar(data)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchUpdateUser = createAsyncThunk(
  'authorization/fetchUpdateUser',
  async function(body: UpdateUserType, { rejectWithValue }) {
    try {
      return await AuthAPI.updateUser(body)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchNewPassword = createAsyncThunk(
  'authorization/fetchNewPassword',
  async function(body: NewPasswordType, { rejectWithValue }) {
    try {
      return await AuthAPI.newPassword(body)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchRemoveUser = createAsyncThunk(
  'authorization/fetchRemoveUser',
  async function(_id: string, { rejectWithValue, dispatch }) {
    try {
      return await AuthAPI.removeUser(_id)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)