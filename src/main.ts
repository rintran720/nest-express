import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4860);
  console.log('Server listen at http://localhost:4860/');
}
bootstrap();
