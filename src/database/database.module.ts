import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from 'src/config';
import { environments } from 'src/environmets';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [config],
    }),
  ],
})
export class DatabaseModule {}
