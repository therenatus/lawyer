import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/uploads`,
    }),
    MulterModule.register({
      limits: {
        fileSize: 1024 * 1024 * 250,
      },
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
