import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CounterEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  number: number;
}
