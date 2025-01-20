import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { EmailSignInStrategy } from './strategies/email/sign-in.strategy';
import { EmailSignUpStrategy } from './strategies/email/sign-up.strategy';
import { HashModule } from '../system/hash/hash.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '../system/jwt/jwt.module';
import { AuthService } from './auth.service';
import { AuthorizationGuard } from './guards/authorization.guard';
import { ConfigModule } from '../system/config/config.module';

@Module({
  imports: [
    HashModule,
    UserModule,
    JwtModule,
    ConfigModule,
  ],
  providers: [
    EmailSignInStrategy,
    EmailSignUpStrategy,
    AuthService,
    AuthorizationGuard
  ],
  exports: [AuthorizationGuard],
  controllers: [AuthController]
})
export class AuthModule { }
