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

  getTodoById(id: number, user: User): Promise<Todo> {
    return this.todosRepository.getTodoById(id, user);
  }

  createTodo(createTodoDto: CreateTodoDto, user: User): Promise<Todo> {
    return this.todosRepository.createTodo(createTodoDto, user);
  }

  deleteTodo(id: number, user: User): Promise<void> {
    return this.todosRepository.deleteTodo(id, user);
  }
}
