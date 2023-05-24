import { IsNotEmpty } from 'class-validator';
import { IFile } from '../../types/file.interface';
import { AdditionalTypeEnum } from '@app/types/AdditionalType.enum';

export class CreateAdditionalDto {
  readonly endDate?: Date;

  // @IsNotEmpty()
  readonly file: IFile;

  @IsNotEmpty()
  readonly type: AdditionalTypeEnum;
}
