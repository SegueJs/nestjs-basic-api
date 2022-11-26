import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from 'pg';
import config from 'src/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { db, host, password, port, user } = configService.postgres;
        return Object.assign({
          type: 'postgres',
          host,
          password,
          username: user,
          port,
          database: db,
          synchronize: false,
          autoLoadEntities: true,
        });
      },
    }),
  ],
  providers: [
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const { db, host, password, port, user } = configService.postgres;

        const client = new Client({
          user,
          host,
          database: db,
          password,
          port: parseInt(port, 10),
        });

        client.connect();

        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['PG', TypeOrmModule],
})
export class DatabaseModule {}
