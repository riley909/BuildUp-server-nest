import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';
import * as dayjs from 'dayjs';
import { NotFoundException } from '@nestjs/common';
import { UpdateContentDto } from './dto/update-content.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

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

  async updateContent(
    id: number,
    updateContentDto: UpdateContentDto,
    user: User,
  ): Promise<Todo> {
    const { content } = updateContentDto;
    const todo = await this.getTodoById(id, user);
    todo.content = content;

    await this.save(todo);
    return todo;
  }

  async updateStatus(
    id: number,
    updateStatusDto: UpdateStatusDto,
    user: User,
  ): Promise<Todo> {
    const { isChecked } = updateStatusDto;
    const todo = await this.getTodoById(id, user);
    todo.isChecked = isChecked;

    await this.save(todo);
    return todo;
  }

  async updateOrder(
    id: number,
    updateOrderDto: UpdateOrderDto,
    user: User,
  ): Promise<Todo> {
    const { order } = updateOrderDto;
    const todo = await this.getTodoById(id, user);
    todo.order = order;

    await this.save(todo);
    return todo;
  }
}
