import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CounterEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ default: 1 })
  number: number;
}
