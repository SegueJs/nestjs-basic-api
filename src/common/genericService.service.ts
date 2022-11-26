import { NotFoundException } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';

export abstract class GenericService<ENTITY> {
  constructor(private readonly genericRepository: Repository<ENTITY>) {}

  async create(data: DeepPartial<ENTITY>): Promise<ENTITY> {
    const newItem = this.genericRepository.create(data);
    await this.genericRepository.save(newItem);
    return newItem;
  }

  async update(
    id: FindOptionsWhere<ENTITY>,
    data: DeepPartial<ENTITY>,
  ): Promise<ENTITY> {
    const product = await this.genericRepository.findOneBy(id);

    if (!product) {
      throw new NotFoundException(`Does not exists`);
    }

    return this.genericRepository.merge(product, data);
  }

  async delete(id: FindOptionsWhere<ENTITY>): Promise<boolean> {
    const foundItem = await this.genericRepository.findOneBy(id);

    if (!foundItem) {
      throw new NotFoundException(`Does not exists`);
    }

    await this.genericRepository.delete(id);

    return true;
  }

  async findAll(): Promise<ENTITY[]> {
    return await this.genericRepository.find({
      relations: ['customer'],
    });
  }

  async findOne(id: FindOptionsWhere<ENTITY>): Promise<ENTITY> {
    const product = await this.genericRepository.findOneBy(id);

    if (!product) {
      throw new NotFoundException(`Does not exists`);
    }

    return product;
  }
}
