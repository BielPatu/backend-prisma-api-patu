import { PassportStrategy } from '@nestjs/passport';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt'; // ✅ Correct import
import { AuthService } from './auth.service';

export interface JwtPayload {
  login: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.SECRETKEY!,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
