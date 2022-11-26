import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GenericService } from 'src/common/genericService.service';
import { CreateUserDto } from 'src/users/dtos/user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class UsersService extends GenericService<User> {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private customerService: CustomersService,
  ) {
    super(userRepo);
  }

  async create(data: CreateUserDto): Promise<User> {
    const newUser = this.userRepo.create(data);
    if (data.customerId) {
      const customer = await this.customerService.findOne({
        id: data.customerId,
      });

      newUser.customer = customer;
    }

    return this.userRepo.save(newUser);
  }
}
