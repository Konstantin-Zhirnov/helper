import { NestFactory } from '@nestjs/core';
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

import { AppModule } from './app.module';


async function bootstrap() {

  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle("Authentication")
    .setDescription("REST API documentation")
    .setVersion("1.0.0")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, document)

  app.use(cookieParser())
  app.enableCors({credentials: true, origin: process.env.CLIENT_PATH});

  await app.listen(PORT || 5000);
}
bootstrap();
