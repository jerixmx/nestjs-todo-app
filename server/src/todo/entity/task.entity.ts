import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TodoEntity } from './todo.entity';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'varchar', nullable: false }) name: string;
  @CreateDateColumn() createdOn?: Date;
  @ManyToOne(() => TodoEntity, (todo) => todo.tasks) todo?: TodoEntity;
}
