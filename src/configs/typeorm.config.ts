import { DataSource } from 'typeorm';
import config from './index';

const AppDataSource = new DataSource({
  type: 'mysql',
  database: config().mysql_database.dbname,
  host: config().mysql_database.host,
  username: config().mysql_database.username,
  password: config().mysql_database.password,
  port: config().mysql_database.port,
  entities: ['dist/../**/*.entity.{js,ts}'],
  synchronize: false,
  migrations: ['dist/src/core/database/migrations/*.{js,ts}'],
  migrationsRun: true,
  logging: true,
});

export default AppDataSource;
