import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  readonly oldPassword: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  readonly newPassword: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  readonly confirmPassword: string;
}
