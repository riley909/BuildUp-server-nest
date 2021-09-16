import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';

@Controller('todos')
@UseGuards(AuthGuard())
export class TodosController {
  constructor(private todosService: TodosService) {}

  @Get()
  getTodos(@GetUser() user: User): Promise<Todo[]> {
    return this.todosService.getTodos(user);
  }

  @Post()
  createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.createTodo(createTodoDto, user);
  }
}
