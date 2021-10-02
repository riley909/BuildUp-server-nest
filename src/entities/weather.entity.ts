import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Weather {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: number;
}
