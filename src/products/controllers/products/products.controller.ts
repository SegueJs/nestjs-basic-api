import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ParseProductPipe } from 'src/common/parse-product.pipe';
import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dto';
import { ProductsService } from '../../services/products/products.service';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get() @HttpCode(HttpStatus.ACCEPTED) getProducts() {
    return this.productService.findAll();
  }

  @Get('database')
  getDb() {
    return this.productService.getDatabase();
  }

  @Get(':id')
  getOneProduct(@Param('id', ParseIntPipe) id: number) {
    console.log(typeof id);
    return this.productService.findOne(id);
  }

  @Post()
  @UsePipes(new ParseProductPipe())
  addProduct(@Body(new ParseProductPipe()) payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
