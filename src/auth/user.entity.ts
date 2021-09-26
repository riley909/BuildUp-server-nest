import { Todo } from '../todos/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  @Exclude()
  refreshToken: string;

  @OneToMany((_type) => Todo, (todo) => todo.user)
  todos: Todo[];
}
