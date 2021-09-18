import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
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

  @Get('/:id')
  getTodoById(@Param('id') id: number, @GetUser() user: User): Promise<Todo> {
    return this.todosService.getTodoById(id, user);
  }

  @Post()
  createTodo(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.createTodo(createTodoDto, user);
  }

  @Delete('/:id')
  deleteTodo(@Param('id') id: number, @GetUser() user: User): Promise<void> {
    return this.todosService.deleteTodo(id, user);
  }

  @Patch('/:id/content')
  updateContent(
    @Param('id') id: number,
    @Body() updateContentDto: UpdateContentDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.updateContent(id, updateContentDto, user);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: number,
    @Body() updateStatusDto: UpdateStatusDto,
    @GetUser() user: User,
  ): Promise<Todo> {
    return this.todosService.updateStatus(id, updateStatusDto, user);
  }
}
