import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/common/genericService.service';
import { Customer } from 'src/users/entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService extends GenericService<Customer> {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {
    super(customerRepo);
  }
}
