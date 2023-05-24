import { IsInt, IsNotEmpty } from 'class-validator';
import { IFile } from '../../types/file.interface';

export class CreateDocumentDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly endDate: Date;

  readonly type: number;

  // @IsInt()
  readonly serviceCode: number;

  readonly service: string;

  readonly file: IFile;
}
