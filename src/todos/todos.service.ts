import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';
import { TodosRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodosRepository)
    private todosRepository: TodosRepository,
  ) {}
  getTodos(user: User): Promise<Todo[]> {
    return this.todosRepository.getTodos(user);
  }

  createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    return this.todosRepository.createTodo(createTodoDto, user);
  }
}
