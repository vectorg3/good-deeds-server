import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class FriendsService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async getAll(userId: string) {
    return (await (await this.userModel.findById(userId)).populate('friends'))
      .friends;
  }

  async add(userId: string, friendId: string) {
    if (!friendId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new ForbiddenException('Пользователь не найден');
    }
    if (!(await this.userModel.findById(friendId))) {
      throw new ForbiddenException('Пользователь не найден');
    }
    await this.userModel.findByIdAndUpdate(userId, {
      $push: { friends: friendId },
    });
    return { message: 'Пользователь успешно добавлен в друзья' };
  }

  async delete(userId: string, friendId: string) {
    await this.userModel.findByIdAndUpdate(userId, {
      $pull: { friends: friendId },
    });
    return { message: 'Пользователь успешно удалён из друзей' };
  }
}
