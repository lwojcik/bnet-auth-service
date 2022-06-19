import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";
import { v4 } from "uuid";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: () => v4().toString(),
        level: process.env.NODE_ENV !== "production" ? "debug" : "error",
        transport:
          process.env.NODE_ENV !== "production"
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
