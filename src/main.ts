import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(
      process.env.BAS_HTTPS_ENABLE === 'true'
        ? {
            https: {
              key: fs.readFileSync(process.env.BAS_HTTPS_KEY_PATH),
              cert: fs.readFileSync(process.env.BAS_HTTPS_CERT_PATH),
            },
          }
        : undefined
    )
  );

  if (process.env.BAS_APP_CORS_ENABLE) {
    const corsConfig =
      process.env.BAS_APP_CORS_ORIGIN.length > 0
        ? {
            origin: process.env.BAS_APP_CORS_ORIGIN,
            methods: ['GET'],
          }
        : undefined;
    app.enableCors(corsConfig);
  }

  if (process.env.NODE_ENV !== 'production') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('bnet-auth-service')
      .setDescription(
        'REST microservice for retrieving and caching OAuth access tokens from Blizzard Battle.net API'
      )
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  await app.listen(process.env.BAS_APP_PORT, process.env.BAS_APP_HOST);
}
bootstrap();
