import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TaskController } from './task/task.controller';

@Module({
  controllers: [TodoController, TaskController],
  providers: [TodoService]
})
export class TodoModule {}
