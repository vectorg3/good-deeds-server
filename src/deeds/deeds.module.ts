import { Module } from '@nestjs/common';
import { DeedsService } from './deeds.service';
import { DeedsController } from './deeds.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Deed, DeedSchema } from './schemas/deed.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Deed.name, schema: DeedSchema }]),
  ],
  controllers: [DeedsController],
  providers: [DeedsService],
})
export class DeedsModule {}
