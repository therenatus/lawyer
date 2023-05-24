import { UpdateServiceDto } from './dto/updateService.dto';
import { IServiceResponse } from './types/response.interface';
import { ServiceEntity } from './service.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    readonly serviceRepository: Repository<ServiceEntity>,
  ) {}

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
