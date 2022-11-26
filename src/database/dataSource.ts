import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';

config();
const configService = new ConfigService();

export const connectionSource = new DataSource({
  type: 'postgres',
  host: configService.get('TYPEORM_HOST'),
  port: parseInt(configService.get('TYPEORM_PORT'), 10),
  username: configService.get('TYPEORM_USERNAME'),
  password: configService.get('TYPEORM_PASSWORD'),
  database: configService.get('TYPEORM_DATABASE'),
  logging: configService.get('TYPEORM_LOGGING') === 'true',
  synchronize: configService.get('TYPEORM_SYNCHRONIZE') === 'true',
  entities: [configService.get('TYPEORM_ENTITIES')],
  migrations: [configService.get('TYPEORM_MIGRATIONS')],
});
