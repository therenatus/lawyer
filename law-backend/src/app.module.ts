import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiceModule } from './service/user.module';
import { TagModule } from './tags/tag.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import ormconfig from './ormconfig';
import { DocumentModule } from './document/document.module';
import { AuthMiddleware } from './service/middleware/auth.middleware';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './auth/guards/role.guard';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { CategoryModule } from '@app/category/category.module';
import { AdditionalModule } from '@app/additional/additional.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    MulterModule.register({
      dest: '/uploads',
    }),
    TypeOrmModule.forRoot(ormconfig),
    TagModule,
    ServiceModule,
    DocumentModule,
    AuthModule,
    FileModule,
    CategoryModule,
    AdditionalModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: RoleGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
