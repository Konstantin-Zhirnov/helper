export type LinkType = Record<'name' | 'to', string>

export type UserType = {
  _id: string
  name: string
  email: string
  password: string
  phone: string
  photo: string
  whatsapp: string
  telegram: string
  viber: string
  isActivated: boolean
  linkForActivated: string
  changePasswordLink: string
  stars: number
  countReviews: number
  paid: boolean
  paidTime: string
}

export type MessageResponseType = {
  message: string
}

export type PasswordType = {
  password: string
  passwordConfirmation: string
}
