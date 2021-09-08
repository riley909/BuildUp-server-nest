import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Todo } from './todos/todo.entity';

@Entity()
export class Created {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created: Date;

  @OneToMany((_type) => Todo, (todo) => todo.created)
  todos: Todo[];
}
