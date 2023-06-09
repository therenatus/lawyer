import { ServiceService } from './../service/service.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ServiceModule } from '../service/user.module';
import { ServiceEntity } from '../service/service.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ServiceModule, TypeOrmModule.forFeature([ServiceEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
