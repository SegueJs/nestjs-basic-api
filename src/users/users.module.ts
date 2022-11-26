import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from 'src/products/products.module';
import { CustomersController } from './controllers/customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
import { Customer } from './entities/customer.entity';
import { User } from './entities/user.entity';
import { CustomersService } from './services/customers/customers.service';
import { UsersService } from './services/users/users.service';

@Module({
  providers: [UsersService, CustomersService],
  controllers: [UsersController, CustomersController],
  imports: [ProductsModule, TypeOrmModule.forFeature([User, Customer])],
})
export class UsersModule {}
