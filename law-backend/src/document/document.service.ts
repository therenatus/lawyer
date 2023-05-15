import { IDocumentResponse } from './types/documentResponse.interface';
import { DocumentEntity } from './document.entity';
import { ServiceEntity } from './../service/service.entity';
import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/createDocument.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDocumentsResponse } from './types/documentsResponse.interface';
import { CounterEntity } from './counter.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(CounterEntity)
    private readonly counterRepository: Repository<CounterEntity>,
  ) {}

  async getAll(query: any): Promise<IDocumentsResponse> {
    const queryBuilder = this.documentRepository
      .createQueryBuilder('document')
      .leftJoinAndSelect('document.author', 'author')
      .leftJoinAndSelect('document.initiators', 'initiators');

    queryBuilder.orderBy('document.createdAt', 'DESC');

    const totalCount = await queryBuilder.getCount();
    if (query.tag) {
      queryBuilder.andWhere('document.tagList LIKE :tag', {
        tag: `%${query.tag}%`,
      });
    }

    if (query.status) {
      queryBuilder.andWhere('document.status = :status', {
        status: query.status,
      });
    }

    if (query.author) {
      const author = await this.serviceRepository.findOneBy({
        name: query.author,
      });
      queryBuilder.andWhere('document.author = :id', {
        id: author.id,
      });
    }

    if ((query.limit = 15)) {
      queryBuilder.limit(query.limit);
    }

    if ((query.offset = 0)) {
      queryBuilder.offset(query.offset);
    }

    const documents = await queryBuilder.getMany();
    return { document: documents, totalCount };
  }

  async getByInitiators(id: string): Promise<IDocumentsResponse> {
    const queryBuilder = this.documentRepository
      .createQueryBuilder('documents')
      .leftJoinAndSelect('documents.initiators', 'initiators')
      .andWhere('documents.initiators = :id', { id });
    queryBuilder.orderBy('documents.endDate', 'DESC');
    const totalCount = await queryBuilder.getCount();
    const document = await queryBuilder.getMany();
    console.log(document);
    return { document: document, totalCount: totalCount };
  }

  async getOne(id: string): Promise<DocumentEntity> {
    return await this.documentRepository.findOneBy({ id });
  }

  async create(
    currentUser: ServiceEntity,
    createDocumentDto: CreateDocumentDto,
  ): Promise<DocumentEntity> {
    const document = new DocumentEntity();
    const counter = await this.counterRepository.findOneBy({ id: 1 });
    if (!counter) {
      await this.counterRepository.save(new CounterEntity());
    }
    if (counter != null || counter != undefined) {
      counter.number = counter.number + 1;
      await this.counterRepository.save(counter);
    }
    const number = `${createDocumentDto.type}${currentUser.code}${
      counter ? counter.number : 1
    }`;
    Object.assign(document, createDocumentDto);
    document.author = currentUser;
    document.tagList = ['ss', 'ss'];
    document.initiators = createDocumentDto.service;
    document.number = number;
    document.fileName = createDocumentDto.file.name;
    document.filePath = createDocumentDto.file.url;
    return await this.documentRepository.save(document);
  }

  async deadlineNear(): Promise<IDocumentsResponse> {
    const today: Date = new Date();
    const threeDayLater = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
    const queryBuilder = this.documentRepository
      .createQueryBuilder('documents')
      .leftJoinAndSelect('documents.initiators', 'initiators');

    queryBuilder.orderBy('documents.endDate', 'ASC');

    queryBuilder.andWhere(
      'documents.endDate BETWEEN :today AND :threeDayLater',
      {
        today: today.toISOString(),
        threeDayLater: threeDayLater.toISOString(),
      },
    );
    const totalCount = await queryBuilder.getCount();
    const documents = await queryBuilder.getMany();
    return { document: documents, totalCount };
  }

  buildDocumentResponseInterface(document: DocumentEntity): IDocumentResponse {
    return {
      document,
    };
  }
}
