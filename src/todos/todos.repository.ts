import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';
import * as dayjs from 'dayjs';
import { NotFoundException } from '@nestjs/common';

@EntityRepository(Todo)
export class TodosRepository extends Repository<Todo> {
  async getTodos(user: User): Promise<Todo[]> {
    const query = this.createQueryBuilder('todo');
    query.where({ user });

    const todos = await query.getMany();
    return todos;
  }

  async getTodoById(id: number, user: User): Promise<Todo> {
    const found = await this.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`ID "${id}" not found`);
    }
    return found;
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

    await this.save(todo);
    return todo;
  }

  async deleteTodo(id: number, user: User): Promise<void> {
    const result = await this.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`ID "${id}" not found`);
    }
  }
}
