import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { ConfigService } from "@nestjs/config";
import { AppModule } from "./app.module";
import { HOST, PORT } from "./common/common.constants";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const configService = app.get(ConfigService);
  const port = configService.get(PORT);
  const hostname = configService.get(HOST);

  await app.listen(port, hostname);
}
bootstrap();
