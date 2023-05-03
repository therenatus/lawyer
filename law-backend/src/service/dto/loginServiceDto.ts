import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginServiceDto {
  @IsNotEmpty()
  readonly shortName: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  readonly password: string;
}
