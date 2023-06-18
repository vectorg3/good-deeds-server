import { ForbiddenException, Injectable } from '@nestjs/common';
import { DeedDto } from './dto/deed.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Deed, DeedDocument } from './schemas/deed.schema';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';

@Injectable()
export class DeedsService {
  constructor(
    @InjectModel(Deed.name) private deedModel: Model<DeedDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(dto: DeedDto, userId: string) {
    return await this.deedModel.create({ ...dto, createdBy: userId });
  }

  async findAll(userId: string) {
    return await this.deedModel.find({ createdBy: userId });
  }

  async findOne(id: string) {
    return await this.deedModel.findById(id);
  }

  async update(userId: string, id: string, dto: DeedDto) {
    const deed = await this.deedModel.findById(id);
    if (
      (await this.userModel.findById(deed.createdBy)).email ==
      (await this.userModel.findById(userId)).email
    ) {
      await this.deedModel.findByIdAndUpdate(id, dto);
      return {
        message: `Запись с идентификатором ${id} была успешно отредактирована`,
      };
    }
    throw new ForbiddenException('Вы не являетесь владельцем этой записи');
  }

  async remove(userId: string, id: string) {
    const deed = await this.deedModel.findById(id);
    if (
      (await this.userModel.findById(deed.createdBy)).email ==
      (await this.userModel.findById(userId)).email
    ) {
      await this.deedModel.findByIdAndRemove(id);
      return {
        message: `Запись с идентификатором ${id} была успешно удалена`,
      };
    }
    throw new ForbiddenException('Вы не являетесь владельцем этой записи');
  }
}
