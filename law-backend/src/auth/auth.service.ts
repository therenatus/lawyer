import { IUser } from './../../../law-frontend/src/types/user.interface';
import { CreateServiceDto } from '@app/service/dto/createServiceDto';
import { LoginServiceDto } from '@app/service/dto/loginServiceDto';
import { ServiceEntity } from '@app/service/service.entity';
import { IServiceResponse } from '@app/service/types/response.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Repository } from 'typeorm';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
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

  async changePassword(
    dto: ChangePasswordDto,
    serviceId: string,
  ): Promise<ServiceEntity> {
    console.log('ssss', dto);
    const confirmPassword = dto.newPassword === dto.confirmPassword;
    if (!confirmPassword) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    const service = await this.serviceRepository
      .createQueryBuilder('services')
      .addSelect('services.password')
      .where('services.id = :serviceId', { serviceId })
      .getOne();
    const validPassword = await compare(dto.oldPassword, service.password);
    if (!validPassword) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    const hashPassword = await hash(dto.newPassword, 10);
    service.password = hashPassword;
    return await this.serviceRepository.save(service);
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
