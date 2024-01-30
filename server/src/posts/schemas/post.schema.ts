import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  category: string;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  authorId: { type: Types.ObjectId; ref: 'User' };

  @Prop()
  time: number;

  @Prop()
  images: string[];

  _id: Types.ObjectId;
}

export const PostSchema = SchemaFactory.createForClass(Post);
