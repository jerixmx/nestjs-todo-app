import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { todos } from 'src/mock/todos.mock';
import { toTodoDto } from '@shared/mapper';
import { toPromise } from '@shared/utils';
import { v4 as uuidv4 } from 'uuid';
import { TodoCreateDto } from './dto/todo.create.dto';
import { TodoDto } from './dto/todo.dto';
import { TodoEntity } from './entity/todo.entity';

@Injectable()
export class TodoService {
  todos: TodoEntity[] = todos;

  async getAllTodo(): Promise<TodoDto[]> {
    return toPromise(this.todos.map((todo) => toTodoDto(todo)));
  }

  async getOneTodo(id: string): Promise<TodoDto> {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new HttpException(
        `Todo item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return toPromise(toTodoDto(todo));
  }

  async createTodo(todoDto: TodoCreateDto): Promise<TodoDto> {
    const { name, description } = todoDto;

    const todo: TodoEntity = {
      id: uuidv4(),
      name,
      description,
    };
    this.todos.push(todo);

    return toPromise(toTodoDto(todo));
  }

  async updateTodo(id: string, todoDto: TodoDto): Promise<TodoDto> {
    const { name, description } = todoDto;

    let todo = this.todos.find((todo) => todo.id === id);

    if (!todo) {
      throw new HttpException(
        `Todo item doesn't exist`,
        HttpStatus.BAD_REQUEST,
      );
    }

    todo = {
      id,
      name,
      description,
    };

    this.todos = this.todos.filter((todo) => todo.id !== id); // remove old object
    this.todos.push(todo); // add new object

    return toPromise(toTodoDto(todo));
  }

  async destroyTodo(id: string): Promise<TodoDto> {
    const todo = this.todos.find((todo) => todo.id === id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return toPromise(toTodoDto(todo));
  }
}
