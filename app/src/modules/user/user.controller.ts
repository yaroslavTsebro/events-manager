import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { AuthorizationGuard } from 'src/modules/auth/guards/authorization.guard';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { IUser } from 'src/shared/contracts/entities/user';
import { User } from 'src/shared/dto/entities/user';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthorizationGuard)
export class UserController {
  constructor() { }

  @Get('profile')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get the currently logged-in user profile' })
  @ApiResponse({ status: 200, description: 'User profile retrieved successfully.', type: User })
  @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })
  async getProfile(@CurrentUser() user: IUser): Promise<User> {
    return user;
  }
}