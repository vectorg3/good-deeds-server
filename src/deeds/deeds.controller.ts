import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DeedsService } from './deeds.service';
import { DeedDto } from './dto/deed.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserId } from 'src/decorators/user-id.decorator';

@Controller('deeds')
@ApiTags('deeds')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class DeedsController {
  constructor(private readonly deedsService: DeedsService) {}

  @Post()
  create(@Body() dto: DeedDto, @UserId() userId: string) {
    return this.deedsService.create(dto, userId);
  }

  @Get()
  findAll(@UserId() userId: string) {
    return this.deedsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deedsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: DeedDto) {
    return this.deedsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deedsService.remove(id);
  }
}
