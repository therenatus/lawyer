import { ServiceEntity } from './../service/service.entity';
import { DocumentEntity } from './document.entity';
import { DocumentController } from './document.controller';
import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CounterEntity } from './counter.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocumentEntity, ServiceEntity, CounterEntity]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService],
})
export class DocumentModule {}
