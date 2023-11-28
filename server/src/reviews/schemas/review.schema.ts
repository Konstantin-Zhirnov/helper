import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review {
  _id: Types.ObjectId

  @Prop()
  title: string

  @Prop()
  description: string

  @Prop()
  stars: number

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: { type: Types.ObjectId; ref: 'User' }

  @Prop({ type: Types.ObjectId, ref: 'User' })
  authorId: { type: Types.ObjectId; ref: 'User' }

  @Prop()
  time: number

  @Prop()
  images: string[]
}

export const ReviewSchema = SchemaFactory.createForClass(Review)