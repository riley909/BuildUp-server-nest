import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [ConfigModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
