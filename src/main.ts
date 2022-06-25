import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fs from 'fs';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { APP, APP_INFO, HTTPS } from './common/constants';
import { Environment } from './common/types';

async function bootstrap() {
  console.log(process.env[HTTPS.enable]);
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(
      process.env[HTTPS.enable] === 'true'
        ? {
            https: {
              key: fs.readFileSync(process.env[HTTPS.keyPath]),
              cert: fs.readFileSync(process.env[HTTPS.certPath]),
            },
          }
        : undefined
    )
  );
  const configService = app.get(ConfigService);
  const port = configService.get<string>(APP.port);
  const host = configService.get<string>(APP.host);

  if (process.env[APP.enableCors] === 'true') {
    const corsConfig = process.env[APP.corsOrigin]
      ? {
          origin: process.env[APP.corsOrigin],
        }
      : undefined;
    app.enableCors(corsConfig);
  }

  if (process.env[APP.environment] !== Environment.production) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(APP_INFO.name)
      .setDescription(APP_INFO.description)
      .setVersion(APP_INFO.version)
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  await app.listen(port, host);
}
bootstrap();
