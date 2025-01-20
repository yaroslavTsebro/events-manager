import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { sign, verify, SignOptions } from 'jsonwebtoken';
import { AuthTokenPayload } from 'src/shared/dto/token';
import { TokenInvalidOrExpiredException } from 'src/shared/exceptions/auth/token-invalid-or-expired.exception';

@Injectable()
export class JwtService {
  private readonly accessTokenSecret: string;
  private readonly refreshTokenSecret: string;

  constructor(private readonly configService: ConfigService) {
    this.accessTokenSecret = this.configService.get<string>('JWT_ACCESS_SECRET');
    this.refreshTokenSecret = this.configService.get<string>('JWT_REFRESH_SECRET');
  }

  sign(payload: object, secret: string, options?: SignOptions): string {
    return sign(payload, secret, options);
  }

  verify(token: string, secret: string): any {
    try {
      return verify(token, secret);
    } catch (e) {
      throw new TokenInvalidOrExpiredException();
    }
  }

  generateAccessToken(payload: AuthTokenPayload): string {
    return this.sign({ ...payload }, this.accessTokenSecret, { expiresIn: '1h' });
  }

  generateRefreshToken(payload: AuthTokenPayload): string {
    return this.sign({ ...payload }, this.refreshTokenSecret, { expiresIn: '7d' });
  }

  verifyAccessToken(token: string): AuthTokenPayload {
    return this.verify(token, this.accessTokenSecret);
  }

  verifyRefreshToken(token: string): AuthTokenPayload {
    return this.verify(token, this.refreshTokenSecret);
  }
}

