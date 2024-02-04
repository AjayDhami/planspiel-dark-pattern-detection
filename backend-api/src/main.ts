import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger.config';
import * as process from 'process';

async function bootstrap() {
  const nodeEnv = process.env.NODE_ENV || 'prod';
  const envFilePath = `.env.${nodeEnv}`;
  console.log('Selected env: ', nodeEnv);
  console.log('Env File Path: ', envFilePath);

  dotenv.config({ path: envFilePath });

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  app.enableCors();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
