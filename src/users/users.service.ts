import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { hashPassword } from 'src/utils/hashPassword';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(dto: UserDto) {
    if (await this.findByEmail(dto.email)) {
      throw new ForbiddenException('Данная почта уже занята');
    }
    const passwordHash = await hashPassword(dto.password);
    return await this.userModel.create({
      ...dto,
      password: passwordHash,
    });
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findById(_id: string) {
    return await this.userModel.findOne({ _id: _id });
  }

  async getUser(_id: string) {
    const user = await this.userModel.findOne({ _id: _id });
    return {
      userName: user.userName,
      email: user.email,
      friends: user.friends,
    };
  }

  async update(userId: string, dto: UserDto) {
    if (await this.userModel.findOne({ email: dto.email })) {
      throw new ForbiddenException('Такая почта уже занята');
    }

    const passwordHash = await hashPassword(dto.password);
    await this.userModel.findByIdAndUpdate(userId, {
      ...dto,
      password: passwordHash,
    });
    return { message: 'Информация о пользователе успешно обновлена' };
  }
}
