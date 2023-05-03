import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { LoginServiceDto } from '@app/service/dto/loginServiceDto';
import { IServiceResponse } from '@app/service/types/response.interface';
import { CreateServiceDto } from '@app/service/dto/createServiceDto';
import { AuthService } from './auth.service';
import { buildResponseInterface } from '../config/service-response';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServiceEntity } from '@app/service/service.entity';
import { Service } from '@app/service/decorators/service.decorator';
import { AuthGuards } from './guards/auth.guard';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @ApiOperation({ summary: 'GET Service' })
  @UseGuards(AuthGuards)
  @Get('me')
  async getCurrentService(
    @Service() service: ServiceEntity,
  ): Promise<IServiceResponse> {
    const ser = await this.service.findById(service.id);
    return this.service.buildResponseInterface(ser);
  }

  @ApiOperation({ summary: 'Login' })
  @Post('login')
  async login(
    @Body() loginServiceDto: LoginServiceDto,
  ): Promise<IServiceResponse> {
    const service = await this.service.login(loginServiceDto);
    return buildResponseInterface(service);
  }

  @ApiOperation({ summary: 'Registration' })
  @Post('registration')
  async register(
    @Body() createServiceDto: CreateServiceDto,
  ): Promise<IServiceResponse> {
    const service = await this.service.create(createServiceDto);
    return buildResponseInterface(service);
  }

  @ApiOperation({ summary: 'PATCH pasword' })
  @UseGuards(AuthGuards)
  @Patch('change-password')
  async changePassword(
    @Body() dto: ChangePasswordDto,
    @Service('id') id: string,
  ): Promise<IServiceResponse> {
    const data = await this.service.changePassword(dto, id);
    return this.service.buildResponseInterface(data);
  }
}
