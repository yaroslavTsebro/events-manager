import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthProviderRepository } from 'src/modules/system/db/repositories/auth-provider.repository';
import { JwtService } from 'src/modules/system/jwt/jwt.service';
import { UserService } from 'src/modules/user/user.service';
import { AuthProviderType } from 'src/shared/contracts/entities/auth-provider';
import { IAuthStrategy } from 'src/shared/contracts/modules/auth';
import { HASH_SERVICE, IHashService } from 'src/shared/contracts/modules/hash';
import { EmailAuthPayload } from 'src/shared/dto/auth/email.dto';
import { TokenResponse, AuthTokenPayload } from 'src/shared/dto/token';
import { UserNotFoundByEmailException } from 'src/shared/exceptions/user/user-not-found-by-email.exception copy';

@Injectable()
export class EmailSignInStrategy implements IAuthStrategy<EmailAuthPayload, TokenResponse> {
  constructor(
    private readonly userService: UserService,
    private readonly authProviderRepository: AuthProviderRepository,
    private readonly jwtService: JwtService,
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
  ) { }

  async authenticate(payload: EmailAuthPayload): Promise<TokenResponse> {
    const { email, password } = payload;

    const user = await this.userService.getUserByEmail(email);

    if (!user) { throw new UserNotFoundByEmailException(email) }

    const authProvider = await this.authProviderRepository.findByUserAndType(user.id, AuthProviderType.EMAIL);

    if (!authProvider) { throw new UnauthorizedException('Email authentication not configured for this user.') }

    const isPasswordValid = await this.hashService.verify(password, authProvider.payload)

    if (!isPasswordValid) { throw new UnauthorizedException('Invalid email or password.')}

    const tokenPayload = new AuthTokenPayload(user.id.toString(), user.email);
    const accessToken = this.jwtService.generateAccessToken(tokenPayload);
    const refreshToken = this.jwtService.generateRefreshToken(tokenPayload);

    return new TokenResponse(accessToken, refreshToken);
  }
}
