import { TaskDto } from 'src/todo/dto/task.dto';
import { TodoDto } from 'src/todo/dto/todo.dto';
import { TaskEntity } from 'src/todo/entity/task.entity';
import { TodoEntity } from 'src/todo/entity/todo.entity';

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
