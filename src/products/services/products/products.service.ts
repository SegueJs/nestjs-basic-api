import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/common/genericService.service';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';

@Injectable()
export class ProductsService extends GenericService<Product> {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {
    super(productRepo);
  }
}
