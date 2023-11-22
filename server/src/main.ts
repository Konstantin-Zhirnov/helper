import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'


async function bootstrap() {
  const fs = require('fs')
  const keyFile = fs.readFileSync(__dirname + '/ssl/privkey.pem')
  const certFile = fs.readFileSync(__dirname + '/ssl/fullchain.pem')

  const PORT = process.env.PORT
  const app = await NestFactory.create(AppModule,
    {
      httpsOptions: {
        key: keyFile,
        cert: certFile,
      },
    },
  )
  app.setGlobalPrefix('api')

  const config = new DocumentBuilder()
    .setTitle('Posts')
    .setDescription('REST API documentation')
    .setVersion('1.0.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, document)

  app.use(cookieParser())
  app.enableCors({
    credentials: true,
    origin: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  })

  await app.listen(PORT || 8000)
}

bootstrap()
