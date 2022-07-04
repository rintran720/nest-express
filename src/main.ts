import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();
  app.use(cookieParser());
  app.use(
    compression({
      level: 6,
      threshold: 100 * 1000, // bytes
    }),
  );

  const PORT = process.env.PORT || 4860;
  await app.listen(PORT);
  console.log(`Server listen at http://localhost:${PORT}/`);
}
bootstrap();
