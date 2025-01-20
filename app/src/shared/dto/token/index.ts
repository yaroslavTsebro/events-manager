import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IAuthTokenPayload, ITokenResponse } from 'src/shared/contracts/dto/token';

export class TokenResponse implements ITokenResponse {
  @ApiProperty({ description: 'JWT access token', })
  accessToken: string;

  @ApiProperty({ description: 'JWT refresh token', })
  refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

export class RefreshPayload {
  @ApiProperty({ description: 'Refresh token for obtaining new access tokens' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export class AuthTokenPayload implements IAuthTokenPayload {
  constructor(public sub: string, public email: string) { }
}
