import { Module } from '@nestjs/common';
import { AdditionalController } from '@app/additional/additional.controller';
import { AdditionalService } from '@app/additional/additional.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentEntity } from '@app/document/document.entity';
import { AdditionalEntity } from '@app/additional/additional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentEntity, AdditionalEntity])],
  controllers: [AdditionalController],
  providers: [AdditionalService],
})
export class AdditionalModule {}
