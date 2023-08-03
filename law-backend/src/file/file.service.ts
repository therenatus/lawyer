import { FileResponse } from '../document/types/file.response';
import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { path } from 'app-root-path';
import { format } from 'date-fns';
import { ensureDir, writeFile } from 'fs-extra';
import * as utf8 from 'utf8';

@Injectable()
export class FileService {
  async upload(file: Express.Multer.File) {
    try {
      let res: FileResponse | null = null;
      const dateFolder = format(new Date(), 'yyyy-MM-dd');
      const uploadedFolder = `${path}/uploads/${dateFolder}`;
      const fileName = utf8.decode(file.originalname);
      const random = Date.now().toString(16);
      await ensureDir(uploadedFolder);

      // for (const file of files) {
      //   await writeFile(`${uploadedFolder}/${file.originalname}`, file.buffer);
      //   res.push({
      //     url: `${dateFolder}/${file.originalname}`,
      //     name: file.originalname,
      //   });
      //   return res;
      // }
      await writeFile(`${uploadedFolder}/${fileName}`, file.buffer);
      res = {
        url: `${dateFolder}/${fileName}`,
        name: fileName,
      };
      console.log(res);
      return res;
    } catch (error) {
      console.log('error ser', error);
    }
  }
}
