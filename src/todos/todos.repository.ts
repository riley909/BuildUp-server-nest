import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { Todo } from './todo.entity';

@EntityRepository(Todo)
export class TodosRepository extends Repository<Todo> {
  async getTodos(user: User): Promise<Todo[]> {
    const query = this.createQueryBuilder('todo');
    query.where({ user });

    const todos = await query.getMany();
    return todos;
  }
}
