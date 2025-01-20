import { Injectable } from '@nestjs/common';
import { RefreshPayload, TokenResponse } from 'src/shared/dto/token';
import { JwtService } from '../system/jwt/jwt.service';
import { IAuthStrategy } from 'src/shared/contracts/modules/auth';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async authenticate<T extends IAuthStrategy<D, R>, D, R>(
    authStrategy: T,
    payload: D,
  ): Promise<R> {
    return await authStrategy.authenticate(payload);
  }

  async refreshTokens(payload: RefreshPayload): Promise<TokenResponse> {
    const { refreshToken } = payload;

    const tokenPayload = this.jwtService.verifyRefreshToken(refreshToken);

    const newAccessToken = this.jwtService.generateAccessToken(tokenPayload);
    const newRefreshToken = this.jwtService.generateRefreshToken(tokenPayload);

    return new TokenResponse(newAccessToken, newRefreshToken);
  }
}
