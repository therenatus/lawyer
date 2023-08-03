import { IDocumentResponse } from './types/documentResponse.interface';
import { DocumentEntity } from './document.entity';
import { ServiceEntity } from './../service/service.entity';
import { Injectable } from '@nestjs/common';
import { CreateDocumentDto } from './dto/createDocument.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDocumentsResponse } from './types/documentsResponse.interface';
import { CounterEntity } from './counter.entity';
import { Padding } from '../config/padding';
import { CategoryEntity } from '../category/category.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentEntity)
    private readonly documentRepository: Repository<DocumentEntity>,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepository: Repository<ServiceEntity>,
    @InjectRepository(CounterEntity)
    private readonly counterRepository: Repository<CounterEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async getAll(query: any): Promise<IDocumentsResponse> {
    const queryBuilder = this.documentRepository
      .createQueryBuilder('document')
      .leftJoinAndSelect('document.author', 'author')
      .leftJoinAndSelect('document.initiators', 'initiators')
      .leftJoinAndSelect('document.additionalDocuments', 'additionalDocuments')
      .leftJoinAndSelect('document.category', 'category');

    queryBuilder.orderBy('document.createdAt', 'DESC');

    if (query.q) {
      queryBuilder.andWhere('document.title LIKE :tag', {
        tag: `%${query.q}%`,
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
    if (query.author) {
      const author = await this.serviceRepository.findOneBy({
        name: query.author,
      });
      queryBuilder.andWhere('document.author = :id', {
        id: author.id,
      });
    }

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset((query.offset - 1) * query.limit);
    }
    const totalCount = await queryBuilder.getCount();
    const documents = await queryBuilder.getMany();
    return {
      document: documents,
      pagination: { totalCount, count: query.limit, page: query.offset - 1 },
    };
  }

  async getByInitiators(id: string, query: any): Promise<IDocumentsResponse> {
    const queryBuilder = this.documentRepository
      .createQueryBuilder('documents')
      .leftJoinAndSelect('documents.initiators', 'initiators')
      .andWhere('documents.initiators = :id', { id });
    queryBuilder.orderBy('documents.endDate', 'DESC');
    const totalCount = await queryBuilder.getCount();
    const document = await queryBuilder.getMany();
    return {
      document: document,
      pagination: { totalCount, count: query.limit, page: query.offset },
    };
  }

  async getOne(id: string): Promise<DocumentEntity> {
    return await this.documentRepository
      .createQueryBuilder('documents')
      .leftJoinAndSelect('documents.additionalDocuments', 'additionalDocuments')
      .leftJoinAndSelect('documents.initiators', 'initiators')
      .where('documents.id = :id', { id })
      .getOne();
  }

  async create(
    currentUser: ServiceEntity,
    createDocumentDto: CreateDocumentDto,
  ): Promise<DocumentEntity> {
    const document = new DocumentEntity();
    const counter = await this.counterRepository.findOneBy({ id: 1 });
    const category = await this.categoryRepository.findOneBy({
      id: createDocumentDto.category,
    });
    const initiator = await this.serviceRepository.findOneBy({
      id: createDocumentDto.service,
    });
    if (!counter) {
      await this.counterRepository.save(new CounterEntity());
    }
    if (counter != null) {
      counter.number = counter.number + 1;
      await this.counterRepository.save(counter);
    }
    const number = `${createDocumentDto.type}${Padding(
      initiator.code,
      2,
    )}${Padding(counter ? counter.number : 1, 3)}/${category.index}`;
    Object.assign(document, createDocumentDto);
    document.author = currentUser;
    document.tagList = ['ss', 'ss'];
    document.initiators = initiator;
    document.number = number;
    if (createDocumentDto.file) {
      document.fileName = createDocumentDto.file.name;
      document.filePath = createDocumentDto.file.url;
    }
    return await this.documentRepository.save(document);
  }

  async deadlineNear(query: any): Promise<IDocumentsResponse> {
    const today: Date = new Date();
    const threeDayLater = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
    const queryBuilder = this.documentRepository
      .createQueryBuilder('documents')
      .leftJoinAndSelect('documents.initiators', 'initiators')
      .leftJoinAndSelect('documents.additionalDocuments', 'additionalDocuments')
      .leftJoinAndSelect('documents.category', 'category');

    queryBuilder.orderBy('documents.endDate', 'ASC');
    if (query.q) {
      queryBuilder.andWhere('documents.title LIKE :tag', {
        tag: `%${query.q}%`,
      });
    }
    if (query.status) {
      queryBuilder.andWhere('documents.status = :status', {
        status: query.status,
      });
    }
    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset((query.offset - 1) * query.limit);
    }
    queryBuilder.andWhere(
      'documents.endDate BETWEEN :today AND :threeDayLater',
      {
        today: today.toISOString(),
        threeDayLater: threeDayLater.toISOString(),
      },
    );
    const totalCount = await queryBuilder.getCount();
    const documents = await queryBuilder.getMany();
    return {
      document: documents,
      pagination: { totalCount, count: query.limit, page: query.offset - 1 },
    };
  }

  buildDocumentResponseInterface(document: DocumentEntity): IDocumentResponse {
    return {
      document,
    };
  }
}
