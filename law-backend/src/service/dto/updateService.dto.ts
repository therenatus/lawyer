import { MaxLength, MinLength } from 'class-validator';

export class UpdateServiceDto {
  readonly id: string;
  readonly name: string;
  readonly shortName: string;
  readonly password: string;
}
