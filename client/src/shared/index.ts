import type { AppDispatch, RootState } from './config/redux/store'
import { store, useAppDispatch, useAppSelector } from './config/redux/store'

import { AddButton } from './ui/AddButton'
import { Circular } from './ui/Circular'
import { Li } from './ui/Li'
import { Link } from './ui/Link'
import { Spinner } from './ui/Spinner'
import { Logo } from './ui/Logo'
import { Stars } from './ui/Stars'
import { Wrapper } from './ui/Wrapper'
import { Modal } from './ui/Modal'
import { Select } from './ui/Select'
import { Avatar } from './ui/Avatar'
import { CategoryItem } from './ui/CategoryItem'
import { FormItem } from './ui/FormItem'
import { FormButton } from './ui/FormButton'
import { SubmitWithImagesButton } from './ui/SubmitWithImagesButton'
import { Title } from './ui/Title'
import { PolicyLink } from './ui/PolicyLink'
import { LocationItem } from './ui/LocationItem'

import { useMatchMedia } from './lib/hooks/useMatchMedia'
import { useDebounce } from './lib/hooks/useDebounce'

import { getExtension, reduceImage, daysAgo } from './lib/helpers'

import { categories, profileMenu } from './constants/constants'

import type { MessageResponseType, PasswordType, UserType } from './types'

export type { AppDispatch, RootState }
export { store, useAppDispatch, useAppSelector }

export {
  AddButton,
  Circular,
  Li,
  Link,
  Spinner,
  Logo,
  Stars,
  Wrapper,
  Modal,
  Select,
  Avatar,
  CategoryItem,
  FormItem,
  FormButton,
  SubmitWithImagesButton,
  Title,
  PolicyLink,
  LocationItem,
}

export { useMatchMedia, useDebounce }

export { getExtension, reduceImage, daysAgo }

export { categories, profileMenu }

export type { UserType, MessageResponseType, PasswordType }
