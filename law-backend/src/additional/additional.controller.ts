import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdditionalService } from '@app/additional/additional.service';
import { CreateAdditionalDto } from '@app/additional/dto/create-additional.dto';
import { AdditionalEntity } from '@app/additional/additional.entity';

@Controller('additional')
export class AdditionalController {
  constructor(private readonly service: AdditionalService) {}

  @Get()
  async getAll(): Promise<AdditionalEntity[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<AdditionalEntity> {
    return await this.service.getOne(id);
  }

  @Post(':id')
  async create(
    @Body() dto: CreateAdditionalDto,
    @Param('id') id: string,
  ): Promise<AdditionalEntity> {
    return await this.service.create(dto, id);
  }
}
