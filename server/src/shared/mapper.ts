import { TodoDto } from 'src/todo/dto/todo.dto';
import { TodoEntity } from 'src/todo/entity/todo.entity';

export const toTodoDto = (data: TodoEntity): TodoDto => {
  const { id, name, description } = data;

  // Will be reassigned when tasks are incorporated
  let todoDto: TodoDto = { id, name, description };

  return todoDto;
};
