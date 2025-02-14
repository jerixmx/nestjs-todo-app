import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { toTodoDto } from '@shared/mapper';
import { toPromise } from '@shared/utils';
import { TodoCreateDto } from './dto/todo.create.dto';
import { TodoDto } from './dto/todo.dto';
import { TodoEntity } from './entity/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '@user/dto/user.dto';
import { UsersService } from '@user/users.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepo: Repository<TodoEntity>,
    private readonly usersService: UsersService,
  ) {}

  async getAllTodo(): Promise<TodoDto[]> {
    const todos = await this.todoRepo.find({ relations: ['tasks'] });
    return todos.map((todo) => toTodoDto(todo));
  }

  async getOneTodo(id: string): Promise<TodoDto> {
    const todo = await this.todoRepo.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!todo) {
      throw new HttpException(`Todo doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return toTodoDto(todo);
  }

  async createTodo(
    { username }: UserDto,
    todoDto: TodoCreateDto,
  ): Promise<TodoDto> {
    const { name, description } = todoDto;

    const owner = await this.usersService.findOne({ where: { username } });
    const todo: TodoEntity = await this.todoRepo.create({
      name,
      description,
      owner,
    });

    await this.todoRepo.save(todo);

    return toPromise(toTodoDto(todo));
  }

  async updateTodo(todoDto: TodoDto): Promise<TodoDto> {
    const { id, name, description } = todoDto;

    let todo: TodoEntity = await this.todoRepo.findOne({ where: { id } });

    if (!todo) {
      throw new HttpException(`Todo doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    todo = {
      id: todo.id,
      name,
      description,
    };

    await this.todoRepo.update({ id }, todo);

    todo = await this.todoRepo.findOne({ where: { id }, relations: ['tasks'] });

    return toTodoDto(todo);
  }

  async destroyTodo(id: string): Promise<TodoDto> {
    const todo: TodoEntity = await this.todoRepo.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!todo) {
      throw new HttpException(`Todo doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    await this.todoRepo.delete({ id }); // delete todo list

    return toTodoDto(todo);
  }
}
