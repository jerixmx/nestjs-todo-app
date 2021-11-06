import { IsNotEmpty } from 'class-validator';
import { TaskDto } from './task.dto';

export class TodoDto {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  name: string;
  description?: string;
  tasks?: TaskDto[];
}
