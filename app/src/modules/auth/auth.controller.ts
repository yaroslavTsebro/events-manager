import { Body, Controller, Post } from '@nestjs/common';
import { EmailSignInStrategy } from './strategies/email/sign-in.strategy';
import { EmailSignUpStrategy } from './strategies/email/sign-up.strategy';
import { AuthService } from './auth.service';
import { EmailAuthPayload } from 'src/shared/dto/auth/email.dto';
import { TokenResponse, RefreshPayload } from 'src/shared/dto/token';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly emailSignUpStrategy: EmailSignUpStrategy,
    private readonly emailSignInStrategy: EmailSignInStrategy,
    private readonly authService: AuthService,
  ) { }

  @Post('/sign-up/email')
  @ApiOperation({ summary: 'Register a user via Email' })
  @ApiResponse({ status: 201, description: 'User successfully registered.', type: TokenResponse })
  @ApiBody({ type: EmailAuthPayload })
  async signUpViaEmail(@Body() payload: EmailAuthPayload): Promise<TokenResponse> {
    return this.authService.authenticate(this.emailSignUpStrategy, payload);
  }

  @Post('/sign-in/email')
  @ApiOperation({ summary: 'Authenticate a user via Email' })
  @ApiResponse({ status: 200, description: 'User successfully authenticated.', type: TokenResponse })
  @ApiBody({ type: EmailAuthPayload })
  async signInViaEmail(@Body() payload: EmailAuthPayload): Promise<TokenResponse> {
    return this.authService.authenticate(this.emailSignInStrategy, payload);
  }

  @Post('/refresh')
  @ApiOperation({ summary: 'Refresh access tokens' })
  @ApiResponse({ status: 200, description: 'Tokens successfully refreshed.', type: TokenResponse })
  @ApiBody({ type: RefreshPayload })
  async refresh(@Body() payload: RefreshPayload): Promise<TokenResponse> {
    return this.authService.refreshTokens(payload);
  }
}