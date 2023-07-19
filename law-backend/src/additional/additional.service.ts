import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdditionalEntity } from '../additional/additional.entity';
import { Repository } from 'typeorm';
import { CreateAdditionalDto } from '../additional/dto/create-additional.dto';
import { DocumentEntity } from '../document/document.entity';
import { AdditionalTypeEnum } from '../types/AdditionalType.enum';
import { Status } from '../document/types/status.type';

@Injectable()
export class AdditionalService {
  constructor(
    @InjectRepository(AdditionalEntity)
    private readonly repository: Repository<AdditionalEntity>,
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
  ) {}

  async getOne(id: string): Promise<AdditionalEntity> {
    return await this.repository.findOneBy({ id });
  }

  async getAll(): Promise<AdditionalEntity[]> {
    return await this.repository.find();
  }

  async create(
    dto: CreateAdditionalDto,
    id: string,
  ): Promise<AdditionalEntity> {
    const additional = new AdditionalEntity();
    const document = await this.documentRepository.findOneBy({ id });
    if (document.status === Status.REJECT) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    Object.assign(additional, dto);
    additional.addiction = document;
    const savedAdditional = await this.repository.save(additional);

    if (dto.type === AdditionalTypeEnum.EXTEND) {
      document.endDate = dto.endDate;
    }
    if (dto.type === AdditionalTypeEnum.TERMINATE) {
      document.status = Status.REJECT;
    }
    await this.documentRepository.save(document);
    return savedAdditional;
  }
}
