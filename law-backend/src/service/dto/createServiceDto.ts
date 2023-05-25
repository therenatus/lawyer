import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../auth/role.enum';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({
    type: String,
    description: 'Обьязателное поле',
  })
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    type: String,
    description: 'Обьязателное поле',
  })
  @IsNotEmpty()
  readonly shortName: string;

  @ApiProperty({
    type: String,
    description: 'Обьязателное поле',
  })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  readonly password: string;

  @ApiProperty({
    type: String,
    description: 'Обьязателное поле',
  })
  @IsNotEmpty()
  readonly role: Role;

  @ApiProperty({
    type: String,
    description: 'Обьязателное поле',
  })
  @IsNotEmpty()
  readonly code: string;

  @ApiProperty({
    type: String,
    description: 'Обьязателное поле',
  })
  @IsNotEmpty()
  readonly permission: string;
}
