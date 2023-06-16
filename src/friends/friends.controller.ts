import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FriendsService } from './friends.service';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('friends')
@ApiTags('friends')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FriendsController {
  constructor(private friendsService: FriendsService) {}

  @Get()
  getAll(@UserId() userId: string) {
    return this.friendsService.getAll(userId);
  }

  @Post(':id')
  add(@UserId() userId: string, @Param('id') friendId: string) {
    return this.friendsService.add(userId, friendId);
  }

  @Delete(':id')
  delete(@UserId() userId: string, @Param('id') friendId: string) {
    return this.friendsService.delete(userId, friendId);
  }
}
