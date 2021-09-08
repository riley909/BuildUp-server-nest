import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Created {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;
}
