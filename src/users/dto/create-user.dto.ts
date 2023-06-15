import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({
    message: 'Имя пользователя должно содержать символы алфавита',
  })
  @Length(2, 12, {
    message: 'Имя пользователя должно содержать от 2 до 12 символов',
  })
  @ApiProperty({
    default: 'Богдан',
  })
  readonly userName: string;

  @IsEmail({}, { message: 'Неверный формат почты!' })
  @ApiProperty({
    default: 'test@gmail.com',
  })
  readonly email: string;

  @Length(4, 20, {
    message: 'Пароль должен содержать от 4 до 20 символов',
  })
  @ApiProperty({
    default: '12345',
  })
  readonly password: string;
}
