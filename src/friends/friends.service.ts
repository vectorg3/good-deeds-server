import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class FriendsService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async getAll(userId: string) {
    return (await this.userModel.findById(userId)).friends;
  }

  async add(userId: string, friendId: string) {
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
