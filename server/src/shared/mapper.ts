import { TaskDto } from '@todo/dto/task.dto';
import { TodoDto } from '@todo/dto/todo.dto';
import { TaskEntity } from '@todo/entity/task.entity';
import { TodoEntity } from '@todo/entity/todo.entity';
import { UserDto } from '@user/dto/user.dto';
import { UserEntity } from '@user/entity/user.entity';

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

export const toUserDto = (data: UserEntity): UserDto => {
  const { id, username, email } = data;
  const userDto: UserDto = { id, username, email };
  return userDto;
};
