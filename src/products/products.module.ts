import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controllers/products/products.controller';
import { Product } from './entities/product.entity';
import { ProductsService } from './services/products/products.service';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Product])],
})
export class ProductsModule {}
