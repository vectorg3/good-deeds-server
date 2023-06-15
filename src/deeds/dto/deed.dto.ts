import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class DeedDto {
  @ApiProperty({
    default: 'Покормить собачку',
  })
  @IsString({
    message: 'Заголовок должен содержать символы алфавита',
  })
  readonly title: string;

  @ApiProperty({
    default: 'Сегодня я покормил уличную собаку колбасой',
  })
  @IsString({
    message: 'Описание должно содержать символы алфавита',
  })
  readonly description: string;
}
