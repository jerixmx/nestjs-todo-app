import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { TaskCreateDto } from '../dto/task.create.dto';
import { TaskDto } from '../dto/task.dto';
import { TodoEntity } from '../entity/todo.entity';
import { TaskEntity } from '../entity/task.entity';
import { toPromise } from '../../shared/utils';
import { toTaskDto } from '../../shared/mapper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepo: Repository<TaskEntity>,
    @InjectRepository(TodoEntity)
    private readonly todoRepo: Repository<TodoEntity>,
  ) {}

  async getTask(id: string): Promise<TaskDto> {
    const task = await this.taskRepo.findOne({ where: { id } });

    if (!task) {
      throw new HttpException(`Task doesn't exist`, HttpStatus.BAD_REQUEST);
    }

    return toPromise(toTaskDto(task));
  }

  async getTasksByTodo(id: string): Promise<TaskDto[]> {
    const tasks: TaskEntity[] = await this.taskRepo.find({
      where: { todo: { id } },
      relations: ['todo'],
    });

    return tasks.map((task) => toTaskDto(task));
  }

  async createTask(
    todoId: string,
    taskCreateDto: TaskCreateDto,
  ): Promise<TaskDto> {
    const { name } = taskCreateDto;

    const todo: TodoEntity = await this.todoRepo.findOne({
      where: { id: todoId },
      relations: ['tasks'],
    });

    const task: TaskEntity = await this.taskRepo.create({
      name,
      todo,
    });

    await this.taskRepo.save(task);

    return toTaskDto(task);
  }

  async destroyTask(id: string): Promise<TaskDto> {
    const task: TaskEntity = await this.taskRepo.findOne({ where: { id } });
    if (!task) {
      throw new HttpException(`Task doesn't exist`, HttpStatus.BAD_REQUEST);
    }
    await this.taskRepo.delete({ id });
    return toTaskDto(task);
  }
}
