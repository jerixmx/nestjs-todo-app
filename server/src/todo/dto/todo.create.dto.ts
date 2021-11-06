import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class TodoCreateDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @MaxLength(500)
  description?: string;
}
