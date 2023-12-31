/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors();
  await app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST);
  console.log(`http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
}
bootstrap();
