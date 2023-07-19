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
  UseGuards,
} from '@nestjs/common';
import { CreateDocumentDto } from './dto/createDocument.dto';
import { Service } from '../service/decorators/service.decorator';
import { IDocumentsResponse } from './types/documentsResponse.interface';
import { AuthGuards } from '../auth/guards/auth.guard';
import { Role } from '../auth/role.enum';
import { Roles } from '../auth/decorators/role.decorator';

@Controller('document')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get()
  @UseGuards(AuthGuards)
  async getAll(@Query() query: any): Promise<IDocumentsResponse> {
    return await this.documentService.getAll(query);
  }

  @Get('/line')
  @UseGuards(AuthGuards)
  async deadlineNear(@Query() query: any): Promise<IDocumentsResponse> {
    return await this.documentService.deadlineNear(query);
  }

  @Get('/initiators')
  @UseGuards(AuthGuards)
  @Roles(Role.SERVICE)
  async getInitiators(
    @Service('id') serviceId: string,
    @Query() query: any,
  ): Promise<IDocumentsResponse> {
    return this.documentService.getByInitiators(serviceId, query);
  }

  @Get(':id')
  @UseGuards(AuthGuards)
  async getOne(@Param('id') id: string): Promise<IDocumentResponse> {
    const document = await this.documentService.getOne(id);
    return this.documentService.buildDocumentResponseInterface(document);
  }

  @Post()
  @UseGuards(AuthGuards)
  @Roles(Role.ADMIN)
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
