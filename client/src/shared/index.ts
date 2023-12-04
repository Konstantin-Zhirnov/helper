import type { AppDispatch, RootState } from './config/redux/store'
import { store, useAppDispatch, useAppSelector } from './config/redux/store'

import { AddButton } from './ui/AddButton'
import { Circular } from './ui/Circular'
import { Li } from './ui/Li'
import { Link } from './ui/Link'
import { Loader } from './ui/Loader'
import { LoginButton } from './ui/LoginButton'
import { Logo } from './ui/Logo'
import { Stars } from './ui/Stars'
import { Wrapper } from './ui/Wrapper'

import { useMatchMedia } from './lib/hooks/useMatchMedia'
import { useDebounce } from './lib/hooks/useDebounce'

import { getExtension, reduceImage } from './lib/helpers'

import type { MessageResponseType, PasswordType, UserType } from './types'

export type { AppDispatch, RootState }
export { store, useAppDispatch, useAppSelector }

export { AddButton, Circular, Li, Link, Loader, LoginButton, Logo, Stars, Wrapper }


export { useMatchMedia, useDebounce }

export { getExtension, reduceImage }

export type { UserType, MessageResponseType, PasswordType }

