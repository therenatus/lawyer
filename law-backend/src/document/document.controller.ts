import { IDocumentResponse } from './types/documentResponse.interface';
import { ServiceEntity } from './../service/service.entity';
import { DocumentService } from './document.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CreateDocumentDto } from './dto/createDocument.dto';
import { Service } from '@app/service/decorators/service.decorator';
import { IDocumentsResponse } from './types/documentsResponse.interface';
import { DocumentEntity } from '@app/document/document.entity';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  async getAll(@Query() query: any): Promise<IDocumentsResponse> {
    return await this.documentService.getAll(query);
  }

  @Get('/line')
  async deadlineNear(@Query() query: any): Promise<IDocumentsResponse> {
    return await this.documentService.deadlineNear(query);
  }

  @Get('/initiators')
  async getInitiators(
    @Service('id') serviceId: string,
    @Query() query: any,
  ): Promise<IDocumentsResponse> {
    console.log(serviceId);
    return this.documentService.getByInitiators(serviceId, query);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<IDocumentResponse> {
    const document = await this.documentService.getOne(id);
    return this.documentService.buildDocumentResponseInterface(document);
  }

  @Post()
  async create(
    @Body() createDocumentDto: CreateDocumentDto,
    @Service() currentService: ServiceEntity,
  ): Promise<IDocumentResponse> {
    const document = await this.documentService.create(
      currentService,
      createDocumentDto,
    );
    return this.documentService.buildDocumentResponseInterface(document);
  }
}
