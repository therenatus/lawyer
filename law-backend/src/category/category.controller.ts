import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { CategoryEntity } from '../category/category.entity';
import { CreateCategoryDto } from '../category/dto/create-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get('/')
  async getAll(): Promise<CategoryEntity[]> {
    return this.service.getAll();
  }

  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    return await this.service.create(dto);
  }

  @Put(':id')
  async update(@Body() dto: CreateCategoryDto, @Param('id') id: string) {
    return await this.service.update(dto, id);
  }
}
