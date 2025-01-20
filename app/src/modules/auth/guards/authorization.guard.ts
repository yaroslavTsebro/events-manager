import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';
import { UserService } from 'src/modules/user/user.service';
import { InvalidOrExpiredTokenException } from 'src/shared/exceptions/auth/invalid-or-expired-token.exception';
import { NoAccessTokenException } from 'src/shared/exceptions/auth/no-access-token.exception';
import { UserNotFoundException } from 'src/shared/exceptions/user/user-not-found.exception';


@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const accessToken = request.headers['authorization'];

    if (!accessToken) {
      throw new NoAccessTokenException();
    }

    try {
      const [_, token] = accessToken.split(' ');
      const payload = verify(
        token,
        this.configService.get<string>('JWT_ACCESS_SECRET'),
      ) as { sub: string; email: string };

      const user = await this.userService.getUserById(+payload.sub);

      if (!user) {
        throw new UserNotFoundException();
      }

      request.user = user;
      return true;
    } catch (e) {
      throw new InvalidOrExpiredTokenException();
    }
  }
}