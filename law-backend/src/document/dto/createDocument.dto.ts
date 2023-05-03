import { IsInt, IsNotEmpty } from 'class-validator';

interface IFile {
  url: string;
  name: string;
}
export class CreateDocumentDto {
  // @IsNotEmpty()
  readonly number: string;

  // @IsNotEmpty()
  readonly title: string;

  // @IsNotEmpty()
  readonly endDate: Date;

  // @IsInt()
  readonly type: number;

  // @IsInt()
  readonly serviceCode: number;

  readonly service: string;

  readonly file: IFile;
}
