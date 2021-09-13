import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TodosService } from './todos.service';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodosController {
  constructor(private todosService: TodosService) {}
}
