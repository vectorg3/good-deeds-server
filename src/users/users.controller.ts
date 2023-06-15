import { Controller, UseGuards, Get, Patch, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';
import { UserDto } from './dto/user.dto';

@Controller('users')
@ApiTags('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async getMe(@UserId() _id: string) {
    return await this.usersService.findById(_id);
  }

  @Patch('/')
  async update(@UserId() userId: string, @Body() dto: UserDto) {
    return this.usersService.update(userId, dto);
  }
}
