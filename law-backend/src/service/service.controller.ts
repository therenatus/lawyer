import { Roles } from '../auth/decorators/role.decorator';
import { UpdateServiceDto } from './dto/updateService.dto';
import { AuthGuard } from './guards/auth.guards';
import { ServiceEntity } from './service.entity';
import { IServiceResponse } from './types/response.interface';
import { ServiceService } from './service.service';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { Service } from './decorators/service.decorator';
import { Role } from '@app/auth/role.enum';
import { ApiOperation } from '@nestjs/swagger';

@Controller('service')
export class ServiceController {
  constructor(private readonly service: ServiceService) {}

  @ApiOperation({ summary: 'GET All Services' })
  @Get('all')
  async getAll(): Promise<ServiceEntity[]> {
    return await this.service.findAll();
  }

  @ApiOperation({ summary: 'GET Service' })
  @Get()
  @UseGuards(AuthGuard)
  async getCurrentService(
    @Service() service: ServiceEntity,
  ): Promise<IServiceResponse> {
    const thisService = await this.service.findById(service.id);
    return this.service.buildResponseInterface(thisService);
  }

  @ApiOperation({ summary: 'UPDATE Service' })
  @Patch()
  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard)
  async update(@Body() updateServiceDto: UpdateServiceDto) {
    console.log(updateServiceDto);
    const newService = await this.service.update(updateServiceDto);
    return this.service.buildResponseInterface(newService);
  }
}
