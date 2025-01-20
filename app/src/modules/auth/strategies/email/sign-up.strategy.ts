import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { JwtService } from 'src/modules/system/jwt/jwt.service';
import { UserService } from 'src/modules/user/user.service';
import { AuthProviderType, IAuthProvider } from 'src/shared/contracts/entities/auth-provider';
import { IUser } from 'src/shared/contracts/entities/user';
import { IAuthStrategy } from 'src/shared/contracts/modules/auth';
import { HASH_SERVICE, IHashService } from 'src/shared/contracts/modules/hash';
import { EmailAuthPayload } from 'src/shared/dto/auth/email.dto';
import { TokenResponse, AuthTokenPayload } from 'src/shared/dto/token';

@Injectable()
export class EmailSignUpStrategy implements IAuthStrategy<EmailAuthPayload, TokenResponse> {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(HASH_SERVICE) private readonly hashService: IHashService,
  ) { }

  async authenticate(payload: EmailAuthPayload): Promise<TokenResponse> {
    const { email, password } = payload;

    const existingUser = await this.userService.getUserByEmail(email);

    if (existingUser) { throw new ConflictException('User with this email already exists.') }

    const hashedPassword = await this.hashService.hash(password, 10)

    const user = await this.userService.create({
      email,
      authProvider: {
        type: AuthProviderType.EMAIL,
        payload: hashedPassword,
      } as IAuthProvider,
    } as IUser);


    const tokenPayload = new AuthTokenPayload(user.id.toString(), user.email);
    const accessToken = this.jwtService.generateAccessToken(tokenPayload);
    const refreshToken = this.jwtService.generateRefreshToken(tokenPayload);

    return new TokenResponse(accessToken, refreshToken);
  }
}
