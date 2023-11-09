import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { User, UserSchema } from './schemas/user.schema'
import { Post, PostSchema } from './schemas/post.schema'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema }, { name: User.name, schema: UserSchema },
    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {
}
