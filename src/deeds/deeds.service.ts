import { Injectable } from '@nestjs/common';
import { DeedDto } from './dto/deed.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Deed, DeedDocument } from './schemas/deed.schema';
import { Model } from 'mongoose';

@Injectable()
export class DeedsService {
  constructor(@InjectModel(Deed.name) private deedModel: Model<DeedDocument>) {}

  async create(dto: DeedDto, userId: string) {
    return await this.deedModel.create({ ...dto, createdBy: userId });
  }

  async findAll(userId: string) {
    return await this.deedModel.find({ createdBy: userId });
  }

  async findOne(id: string) {
    return await this.deedModel.findById(id);
  }

  async update(id: string, dto: DeedDto) {
    await this.deedModel.findByIdAndUpdate(id, dto);
    return {
      message: `Запись с идентификатором ${id} была успешно отредактирована`,
    };
  }

  async remove(id: string) {
    await this.deedModel.findByIdAndRemove(id);
    return { message: `Запись с идентификатором ${id} была успешно удалена` };
  }
}
