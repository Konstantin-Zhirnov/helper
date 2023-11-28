import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  _id: Types.ObjectId

  @ApiProperty({ example: 'Konstantin', description: 'User`s name' })
  @Prop()
  name: string

  @ApiProperty({ example: 'user@gmail.com', description: 'User`s email' })
  @Prop({ required: true })
  email: string

  @ApiProperty({ example: '123456', description: 'User`s password' })
  @Prop({ required: true })
  password: string

  @ApiProperty({ example: '+12501111111', description: 'User`s phone number' })
  @Prop({ required: false })
  phone: string

  @ApiProperty({ example: '+12501111111', description: 'User`s WhatsApp' })
  @Prop({ required: false })
  whatsapp: string

  @ApiProperty({ example: '@kostya_zhirnov', description: 'User`s Telegram' })
  @Prop({ required: false })
  telegram: string

  @ApiProperty({ example: '+12501111111', description: 'User`s Viber' })
  @Prop({ required: false })
  viber: string

  @ApiProperty({ example: 'https://image.jpg', description: 'User`s photo' })
  @Prop({ required: false })
  photo: string

  @ApiProperty({ example: 'true', description: 'The user account is activated' })
  @Prop({ required: true })
  isActivated: boolean

  @ApiProperty({ example: 'dzvjndd6552sgbsz', description: 'Link to activate the user account' })
  @Prop({ required: false })
  linkForActivated: string

  @ApiProperty({ example: 'dzvjndd6552sgbsz', description: 'Link to change the user`s password' })
  @Prop({ required: false })
  changePasswordLink: string

  @ApiProperty({ example: 4, description: 'Number of stars' })
  @Prop({ required: false })
  stars: number

  @ApiProperty({ example: 4, description: 'Number of reviews' })
  @Prop({ required: false })
  countReviews: number

  @ApiProperty({ example: 'true', description: 'Is the subscription paid for' })
  @Prop({ required: false })
  paid: boolean

  @ApiProperty({ example: 'true', description: 'Subscription payment time' })
  @Prop({ required: false })
  paidTime: string
}

export const UserSchema = SchemaFactory.createForClass(User)
