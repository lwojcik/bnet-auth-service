import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { v4 } from "uuid";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import appConfig from "./config/app.config";
import { Environment, DEFAULTS, APP } from "./common/common.constants";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: () => v4().toString(),
        level:
          process.env[APP.env] !== Environment.production
            ? DEFAULTS.logLevel.development
            : DEFAULTS.logLevel.production,
        transport:
          process.env[APP.env] !== Environment.production
            ? {
                target: "pino-pretty",
                options: {
                  colorize: true,
                  translateTime: "SYS:dd/mm/yyyy, HH:MM:ss",
                  ignore: "req,res,pid,context,responseTime",
                  singleLine: true,
                },
              }
            : undefined,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
