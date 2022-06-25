import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { authConfig } from '../../config';

type AuthPayload = {
  username: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConf: ConfigType<typeof authConfig>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: authConf.jwtSecret,
    });
  }

  validate(payload: AuthPayload) {
    if (this.authConf.enable) {
      if (payload.username === this.authConf.username) {
        return { username: payload.username };
      }
      return null;
    }
    return 'authorized';
  }
}
