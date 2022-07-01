import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();

  const PORT = process.env.PORT || 4860;
  await app.listen(PORT);
  console.log(`Server listen at http://localhost:${PORT}/`);
}
bootstrap();
