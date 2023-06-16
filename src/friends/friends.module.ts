import { Module } from '@nestjs/common';
import { FriendsController } from './friends.controller';
import { UsersModule } from 'src/users/users.module';
import { FriendsService } from './friends.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [FriendsController],
  providers: [FriendsService],
})
export class FriendsModule {}
