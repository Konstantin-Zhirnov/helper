import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Post {
  firstid: string;

  @ApiProperty({ example: 'Konstantin', description: 'User`s name' })
  @Prop()
  title: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'User`s email' })
  @Prop({ required: true })
  description: string;

  @ApiProperty({ example: 'user@gmail.com', description: 'User`s email' })
  @Prop({ required: true })
  user: {
    "$ref" : "users",
    "$id" : ObjectId("5126bc054aed4daf9e2ab772"),
    "$db" : "helper-users",
    "extraField" : "anything"
  }
}

export const PostSchema = SchemaFactory.createForClass(Post);
