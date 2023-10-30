import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { JwtModule } from "@nestjs/jwt";

import { Post, PostSchema } from "./schemas/post.schema";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema }
    ]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    })
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
