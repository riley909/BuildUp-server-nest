import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  order: number;

  @Column()
  isChecked: boolean;

  // foreignKey: 'user_id'
  // foreignKey: 'date_id'
}
