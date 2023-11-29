import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { join } from 'path'
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module'

import { PostsModule } from './posts/posts.module'
import { ReviewsModule } from './reviews/reviews.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostsModule,
    ReviewsModule,
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public') }),
    MongooseModule.forRootAsync({
      useFactory: () => ({ uri: process.env.MONGO_CONNECTION_STRING }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
