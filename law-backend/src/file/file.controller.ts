import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@Controller('file')
export class FileController {
  constructor(private readonly service: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('files'))
  async upload(
    @UploadedFile() files: Express.Multer.File,
    @Req() req: Request,
  ) {
    try {
      return this.service.upload(files);
    } catch (error) {
      console.log('errror', error);
    }
  }
}
