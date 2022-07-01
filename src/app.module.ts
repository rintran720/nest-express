import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config';

const entities = [];

@Module({
  imports: [
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
