import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryEntity } from '../category/category.entity';
import { CreateCategoryDto } from '../category/dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repository: Repository<CategoryEntity>,
  ) {}

  async getAll(): Promise<CategoryEntity[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<CategoryEntity> {
    return await this.repository.findOneBy({ id });
  }

  async create(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const newCategory = new CategoryEntity();
    Object.assign(newCategory, dto);
    return await this.repository.save(newCategory);
  }

  async update(dto: CreateCategoryDto, id: string): Promise<CategoryEntity> {
    const category = await this.findOne(id);
    Object.assign(category, dto);
    return await this.repository.save(category);
  }
}
