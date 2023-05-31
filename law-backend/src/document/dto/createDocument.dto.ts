import { IsInt, IsNotEmpty } from 'class-validator';
import { IFile } from '../../types/file.interface';

export class CreateDocumentDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  readonly endDate: Date;

  @IsNotEmpty()
  readonly contrAgent: string;

  @IsNotEmpty()
  readonly price: string;

  @IsNotEmpty()
  readonly startDate: Date;

  @IsNotEmpty()
  readonly type: number;

  // @IsNotEmpty()
  // @IsInt()
  // readonly serviceCode: number;

  @IsNotEmpty()
  readonly service: string;

  @IsNotEmpty()
  readonly file: IFile;
}
