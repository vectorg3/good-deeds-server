import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationErrorException } from './validation/validation-error.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  app.enableCors({ credentials: true, origin: true });
  const PORT = process.env.PORT || 5000;

  const config = new DocumentBuilder()
    .setTitle('Добрые дела')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new ValidationErrorException(errors);
      },
    })
  );
  await app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
}
bootstrap();
