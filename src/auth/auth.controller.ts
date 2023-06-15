import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { IUser } from './models/USER';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({ type: UserDto })
  async login(@Request() req) {
    return this.authService.login(req.user as IUser);
  }

  @Post('register')
  async register(@Body() dto: UserDto) {
    return this.authService.register(dto);
  }
}
