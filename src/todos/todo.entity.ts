import { User } from 'src/auth/user.entity';
import { Created } from 'src/created.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne((_type) => User, (user) => user.todos, { eager: false })
  user: User;

  @ManyToOne((_type) => Created, (created) => created.todos)
  created: Created;
}
