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
import { SmallLink } from './ui/SmallLink'
import { LocationItem } from './ui/LocationItem'
import { Img } from './ui/Img'
import { HelpDescriptions } from './ui/HelpDescriptions'
import { HelpItem } from './ui/HelpItem'
import { MobileLink } from './ui/MobileLink'

import { useMatchMedia } from './lib/hooks/useMatchMedia'
import { useDebounce } from './lib/hooks/useDebounce'

import { getExtension, reduceImage, daysAgo } from './lib/helpers'

import { categories, profileMenu, titles } from './constants/constants'

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
  SmallLink,
  LocationItem,
  Img,
  HelpDescriptions,
  HelpItem,
  MobileLink,
}

export { useMatchMedia, useDebounce }

export { getExtension, reduceImage, daysAgo }

export { categories, profileMenu, titles }

export type { UserType, MessageResponseType, PasswordType }
