import { EntityRepository, Repository } from 'typeorm';
import { Todo } from './todo.entity';

@EntityRepository(Todo)
export class TodosRepository extends Repository<Todo> {}
