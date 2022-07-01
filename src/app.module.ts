import { Module, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { async } from 'rxjs';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        pinoHttp: {
          name: 'Votek',
          level: config.get('server.env') !== 'production' ? 'debug' : 'info',
          transport:
            config.get('server.env') !== 'production'
              ? { target: 'pino-pretty' }
              : undefined,
          // and all the others...
        },
        exclude: [{ method: RequestMethod.ALL, path: 'check' }],
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'mongodb',
        host: config.get('database.host', 'localhost'),
        port: +config.get<number>('database.port', 27017),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.dbname', 'nest_expess'),
        entities: ['dist/**/*.entity{.ts,.js}'],
        // migrations: [__dirname + '../migrations/*{.ts,.js}'],
        // migrationsRun: true,
        logging: true,
        // synchronize: true, // should not be used in production
      }),
      inject: [ConfigService],
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
