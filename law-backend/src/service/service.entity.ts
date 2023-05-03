import { Role } from './../auth/role.enum';
import { DocumentEntity } from '../document/document.entity';
import { hash } from 'bcrypt';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'services' })
export class ServiceEntity {
  @ApiProperty({
    example: '3851fd47-a26e-4138-a784-ab1051c19696',
    description: 'Уникальный идентификатор',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 21, description: 'Уникальный код службы' })
  @Column({ unique: true })
  code: number;

  @ApiProperty({
    example: 'Служба Информацонных технологий и Связи',
    description: 'Названия службы',
  })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: 'S', description: 'Инициалы службы' })
  @Column({ unique: true })
  shortName: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @Column({ select: false })
  password: string;

  @OneToMany(() => DocumentEntity, (document) => document.author)
  documents: DocumentEntity[];

  @OneToMany(() => DocumentEntity, (document) => document.initiators)
  initiator: string;

  @ApiProperty({ example: 'Admin', description: 'Роль' })
  @Column({ type: 'enum', enum: Role, default: Role.SERVICE })
  role: Role;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
