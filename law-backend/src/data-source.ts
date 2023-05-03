import { DataSource } from 'typeorm';

const configMigration = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'law',
  password: 'password',
  database: 'law',
  entities: [__dirname + '/**/*.entity{.ts, js}'],
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts, js}'],
});

export default configMigration;
