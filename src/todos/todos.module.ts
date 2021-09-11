import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TodosController } from './todos.controller';
import { TodosRepository } from './todos.repository';
import { TodosService } from './todos.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodosRepository]),
    ConfigModule,
    AuthModule,
  ],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
