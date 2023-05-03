import { Role } from './../auth/role.enum';
import { UpdateServiceDto } from './dto/updateService.dto';
import { IServiceResponse } from './types/response.interface';
import { LoginServiceDto } from './dto/loginServiceDto';
import { ServiceEntity } from './service.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/createServiceDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { th } from 'date-fns/locale';
@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<ServiceEntity> {
    const shortName = await this.serviceRepository.findOneBy({
      shortName: createServiceDto.shortName,
    });

    if (shortName) {
      throw new HttpException('this name are taken', HttpStatus.BAD_REQUEST);
    }
    const newService = new ServiceEntity();
    Object.assign(newService, createServiceDto);
    newService.role = Role.ADMIN;
    return await this.serviceRepository.save(newService);
  }

  async login({
    shortName,
    password,
  }: LoginServiceDto): Promise<ServiceEntity> {
    try {
      const service = await this.serviceRepository
        .createQueryBuilder('services')
        .addSelect('services.password')
        .where('services.shortName = :shortName', { shortName })
        .getOne();
      if (!service) {
        throw new HttpException(
          'Login or password is not valid',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      const isPassword = await compare(password, service.password);
      if (!isPassword) {
        throw new HttpException(
          'Login or password is not valid',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }
      delete service.password;

      return service;
    } catch (error) {
      console.log('eeeeerrrror', error);
    }
  }

  async findById(id: string): Promise<ServiceEntity> {
    return await this.serviceRepository.findOneBy({ id });
  }

  async findAll(): Promise<ServiceEntity[]> {
    return await this.serviceRepository.find();
  }

  async update(updateServiceDto: UpdateServiceDto): Promise<ServiceEntity> {
    const data = await this.serviceRepository.findOneBy({
      id: updateServiceDto.id,
    });
    Object.assign(data, updateServiceDto);
    return await this.serviceRepository.save(data);
  }

  generateJwt(service: ServiceEntity): string {
    return sign(
      {
        id: service.id,
        shortName: service.shortName,
      },
      process.env.JWT_SECRET,
    );
  }

  buildResponseInterface(service: ServiceEntity): IServiceResponse {
    return {
      service: service,
      token: this.generateJwt(service),
    };
  }
}
