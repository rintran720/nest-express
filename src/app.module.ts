import { Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './configs';
import { CommonMiddleware } from './common/middlewares/common.middleware';
import { MongoTypeOrmModule } from './core/database/mongodb-typeorm.module';

@Module({
  imports: [
    // LoggerModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: async (config: ConfigService) => ({
    //     pinoHttp: {
    //       name: 'Votek',
    //       level: config.get('server.env') !== 'production' ? 'debug' : 'info',
    //       transport:
    //         config.get('server.env') !== 'production'
    //           ? { target: 'pino-pretty' }
    //           : undefined,
    //       // and all the others...
    //     },
    //     exclude: [{ method: RequestMethod.ALL, path: 'check' }],
    //   }),
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    MongoTypeOrmModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, CommonMiddleware],
})
export class AppModule {}
