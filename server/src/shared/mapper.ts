import { TodoDto } from '@todo/dto/todo.dto';
import { TodoEntity } from '@todo/entity/todo.entity';

export const toTodoDto = (data: TodoEntity): TodoDto => {
  const { id, name, description, tasks } = data;

  let todoDto: TodoDto = { id, name, description };

  if (tasks) {
    todoDto = {
      ...todoDto,
      tasks: tasks.map((task: TaskEntity) => toTaskDto(task)),
    };
  }
  return todoDto;
};

export const toTaskDto = (data: TaskEntity): TaskDto => {
  const { id, name } = data;

  const taskDto: TaskDto = { id, name };

  return taskDto;
};
