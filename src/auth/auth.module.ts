import { Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { authConfig } from '../config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoggerModule } from '../logger/logger.module';

const imports = [ConfigModule.forFeature(authConfig), LoggerModule];
const providers: Provider[] = [];

// istanbul ignore next
if (process.env.BAS_AUTH_ENABLE === 'true') {
  imports.push(
    JwtModule.registerAsync({
      imports: [ConfigModule.forFeature(authConfig)],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('auth.jwtSecret'),
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
