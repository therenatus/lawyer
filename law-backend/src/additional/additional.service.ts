import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdditionalEntity } from '@app/additional/additional.entity';
import { Repository } from 'typeorm';
import { CreateAdditionalDto } from '@app/additional/dto/create-additional.dto';
import { DocumentEntity } from '@app/document/document.entity';
import { AdditionalTypeEnum } from '@app/types/AdditionalType.enum';

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
    Object.assign(additional, dto);
    additional.addiction = document;
    const savedAdditional = await this.repository.save(additional);

    if (dto.type === AdditionalTypeEnum.EXTEND) {
      document.endDate = dto.endDate;
    }
    await this.documentRepository.save(document);
    return savedAdditional;
  }
}
