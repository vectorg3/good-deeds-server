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

  async findAll() {
    return await this.userModel.find();
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async findById(_id: string) {
    return await this.userModel.findOne({ _id: _id });
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

  async addFriend(userId: string, friendId: string) {
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { friends: friendId },
    });
    return { message: 'Пользователь успешно добавлен в друзья' };
  }

  async deleteFriend(userId: string, friendId: string) {
    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { friends: friendId },
    });
    return { message: 'Пользователь успешно удалён из друзей' };
  }
}
