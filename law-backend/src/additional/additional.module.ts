import { Module } from '@nestjs/common';
import { AdditionalController } from '../additional/additional.controller';
import { AdditionalService } from '../additional/additional.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentEntity } from '../document/document.entity';
import { AdditionalEntity } from '../additional/additional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntity, AdditionalEntity])],
  controllers: [AdditionalController],
  providers: [AdditionalService],
})
export class AdditionalModule {}
