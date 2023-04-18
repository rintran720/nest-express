import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'mongodb',
        host: config.get('database.host', 'localhost'),
        port: +config.get<number>('database.port', 27017),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.dbname', 'nest_express'),
        entities: [__dirname + '/../../../**/*.entity.{js,ts}'],
        // migrations: [__dirname + '/migrations/*{.ts,.js}'],
        // migrationsRun: true,
        logging: true,
        // synchronize: true, // should not be used in production
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class MongoTypeOrmModule {}
