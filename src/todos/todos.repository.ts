import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';
import * as dayjs from 'dayjs';

@EntityRepository(Todo)
export class TodosRepository extends Repository<Todo> {
  async getTodos(user: User): Promise<Todo[]> {
    const query = this.createQueryBuilder('todo');
    query.where({ user });

    const todos = await query.getMany();
    return todos;
  }

  async createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    const { content, order } = createTodoDto;

    const now: string = dayjs().format('YYYY-MM-DD');
    const todo = await this.create({
      content,
      created: now,
      order,
      isChecked: false,
      user,
    });

    return todo;
  }
}
