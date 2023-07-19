import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '../category/category.service';
import { CategoryEntity } from '../category/category.entity';
import { CreateCategoryDto } from '../category/dto/create-category.dto';
import { AuthGuards } from '../auth/guards/auth.guard';
import { Role } from '../auth/role.enum';
import { Roles } from '../auth/decorators/role.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get('/')
  async getAll(): Promise<CategoryEntity[]> {
    return this.service.getAll();
  }

  @Post()
  @UseGuards(AuthGuards)
  @Roles(Role.SUPERADMIN)
  async create(@Body() dto: CreateCategoryDto) {
    return await this.service.create(dto);
  }

  @Put(':id')
  @UseGuards(AuthGuards)
  @Roles(Role.SUPERADMIN)
  async update(@Body() dto: CreateCategoryDto, @Param('id') id: string) {
    return await this.service.update(dto, id);
  }
}
