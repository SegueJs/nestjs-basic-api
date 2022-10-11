import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dto';
import { Product } from '../../entities/product.entity';
import config from 'src/config';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  private products: Product[] = [
    {
      name: 'producto',
      id: 1,
      description: 'My product',
      image: 'http.scs.csag',
      price: 2000,
      stock: 2,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    return product;
  }

  create(product: CreateProductDto) {
    console.log(product);
    this.products = [
      { ...product, id: this.products.length },
      ...this.products,
    ];

    return { ...product, id: this.products.length };
  }

  update(id: number, changes: UpdateProductDto) {
    const product = this.findOne(id);
    const index = this.products.findIndex((item) => item.id === id);

    this.products[index] = {
      ...product,
      ...changes,
    };
  }

  remove(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    this.products = this.products.filter((item) => item.id !== id);
    return true;
  }

  getDatabase() {
    const data = {
      name: this.configService.database.name,
      port: this.configService.database.port,
      apiKey: this.configService.apiKey,
    };

    return data;
  }
}
