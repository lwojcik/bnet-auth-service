import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { authConfig } from '../config';
import { AUTH } from '../common/constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoggerModule } from '../logger/logger.module';

const imports = [ConfigModule.forFeature(authConfig), LoggerModule];
const providers: Provider[] = [];

if (process.env[AUTH.enable] === 'true') {
  imports.push(
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(AUTH.jwtSecret),
        verifyOptions: {
          ignoreExpiration: true,
        },
      }),
    })
  );
  providers.push(JwtStrategy);
}

@Module({
  imports,
  providers,
})
export class AuthModule {}
