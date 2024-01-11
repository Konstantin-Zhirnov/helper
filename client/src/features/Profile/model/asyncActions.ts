import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'

import { setIsAuth } from '../../Authorization/model/slice'

import { ProfileAPI } from '../api'
import type { NewPasswordType, UpdateUserType } from '../types'
import {CreatePaymentType} from "../types";
import {ChangePasswordType} from "../../Authorization/types";
import {AuthAPI} from "../../Authorization/api";


export const fetchChangeAvatar = createAsyncThunk(
  'profile/fetchChangeAvatar',
  async function(data: FormData, { rejectWithValue }) {
    try {
      return await ProfileAPI.changeAvatar(data)
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
  'profile/fetchUpdateUser',
  async function(body: UpdateUserType, { rejectWithValue }) {
    try {
      return await ProfileAPI.updateUser(body)
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
  'profile/fetchNewPassword',
  async function(body: NewPasswordType, { rejectWithValue }) {
    try {
      return await ProfileAPI.newPassword(body)
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
  'profile/fetchRemoveUser',
  async function(_id: string, { rejectWithValue, dispatch }) {
    try {
      dispatch(setIsAuth(false))
      return await ProfileAPI.removeUser(_id)
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data.message)
      } else {
        return rejectWithValue(error)
      }
    }
  },
)

export const fetchCreatePayment = createAsyncThunk(
    'profile/fetchCreatePayment',
    async function(body: CreatePaymentType, { rejectWithValue }) {
        try {
            return await ProfileAPI.createPayment(body)
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
    'profile/fetchChangePassword',
    async function(body: ChangePasswordType, { rejectWithValue }) {
        try {
            return await ProfileAPI.changePassword(body)
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                return rejectWithValue(error.response?.data.message)
            } else {
                return rejectWithValue(error)
            }
        }
    },
)