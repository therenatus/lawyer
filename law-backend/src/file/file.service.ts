import { FileResponse } from '@app/document/types/file.response';
import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { format } from 'date-fns';
import { ensureDir, writeFile } from 'fs-extra';

@Injectable()
export class FileService {
  async upload(files: Express.Multer.File[]) {
    try {
      const res: FileResponse[] = [];
      const dateFolder = format(new Date(), 'yyyy-MM-dd');
      const uploadedFolder = `${path}/uploads/${dateFolder}`;
      await ensureDir(uploadedFolder);

      for (const file of files) {
        await writeFile(`${uploadedFolder}/${file.originalname}`, file.buffer);
        res.push({
          url: `${dateFolder}/${file.originalname}`,
          name: file.originalname,
        });
        return res;
      }
    } catch (error) {
      console.log('error ser', error);
    }
  }
}
