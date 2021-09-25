import { Exclude } from 'class-transformer';
import { User } from '../auth/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  created: string;

  @Column()
  order: number;

  @Column()
  isChecked: boolean;

  @ManyToOne((_type) => User, (user) => user.todos, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;
}
