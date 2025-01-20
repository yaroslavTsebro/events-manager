export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthTokenPayload {
  sub: string;
  email: string;
}
