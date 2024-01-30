import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { AuthAPI } from '../api'
import { setIsActivated, setUser } from '../../../features'
import type { UserType } from '../../../shared'

import type { ChangePasswordType, LinkType, LoginType, SendEmailType } from '../types'

export const fetchLogin = createAsyncThunk(
  'authorization/fetchLogin',
  async function (body: LoginType, { rejectWithValue, dispatch }) {
    try {
      const user = await AuthAPI.login(body)
      dispatch(setUser(user))
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
  async function (body: UserType, { rejectWithValue }) {
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
  async function (body: LinkType, { rejectWithValue, dispatch }) {
    try {
      await AuthAPI.confirmation(body)
      dispatch(setIsActivated(true))
      return 'success!'
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
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const user = await AuthAPI.getUser()
      dispatch(setUser(user))
      return user
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
  async function (_, { rejectWithValue }) {
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
  async function (body: SendEmailType, { rejectWithValue }) {
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
