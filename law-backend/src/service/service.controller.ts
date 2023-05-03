import { Roles } from '../auth/decorators/role.decorator';
import { UpdateServiceDto } from './dto/updateService.dto';
import { AuthGuard } from './guards/auth.guards';
import { ServiceEntity } from './service.entity';
import { IExpressRequest } from '../types/expressRequest.interface';
import { LoginServiceDto } from './dto/loginServiceDto';
import { IServiceResponse } from './types/response.interface';
import { CreateServiceDto } from './dto/createServiceDto';
import { ServiceService } from './service.service';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Service } from './decorators/service.decorator';
import { Request } from 'express';
import { Role } from '@app/auth/role.enum';
import { RoleGuard } from '@app/auth/guards/role.guard';
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
