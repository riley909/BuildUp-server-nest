import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodosRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(TodosRepository)
    private todosRepository: TodosRepository,
  ) {}
}
