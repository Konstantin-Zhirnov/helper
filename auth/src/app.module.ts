import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';

import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailModule } from './mail/mail.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    ServeStaticModule.forRoot({rootPath: join(__dirname, '..', 'public')}),
    MongooseModule.forRootAsync({
      useFactory: () => ({uri: process.env.MONGO_CONNECTION_STRING})
    }),
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
