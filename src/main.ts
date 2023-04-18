import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';
import * as session from 'express-session';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { TransformResponseInterceptor } from '~/common/interceptors/transform-response.interceptor';
import configureSwagger from './core/swagger/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  });
  app.use(cookieParser());
  app.use(
    session({
      secret: 'secret key',
      resave: false,
      saveUninitialized: true,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 0.5 * 60 * 1000,
      },
    }),
  );
  // app.use(csurf({ cookie: true }));
  app.use(
    compression({
      level: 6,
      threshold: 100 * 1000, // bytes
    }),
  );

  app.useGlobalInterceptors(new TransformResponseInterceptor());

  configureSwagger(app);

  const PORT = process.env.PORT || 4860;
  await app.listen(PORT);
  console.log(`Server listen at http://localhost:${PORT}`);
}
bootstrap();
