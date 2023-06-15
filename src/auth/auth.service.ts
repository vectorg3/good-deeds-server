import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/users/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { IUser } from './models/USER';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    return null;
  }

  async register(dto: UserDto) {
    try {
      const userData = await this.userService.create(dto);

      return {
        token: this.jwtService.sign({ _id: userData._id }),
      };
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  async login(user: IUser) {
    return {
      token: this.jwtService.sign({ _id: user._id }),
    };
  }
}
