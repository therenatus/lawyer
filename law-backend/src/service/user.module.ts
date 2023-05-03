import { ServiceEntity } from './service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceService } from './service.service';
import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity])],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
