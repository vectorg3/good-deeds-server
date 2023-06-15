import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DeedsModule } from './deeds/deeds.module';
import { APP_FILTER } from '@nestjs/core';
import { ValidationErrorFilter } from './validation/validation-error.filter';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_CONNECTION),
    AuthModule,
    DeedsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ValidationErrorFilter,
    },
  ],
})
export class AppModule {}
