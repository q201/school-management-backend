import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { Class } from './Class';
import { Grade } from './Grade';

export enum AssignmentType {
  HOMEWORK = 'homework',
  QUIZ = 'quiz',
  TEST = 'test',
  PROJECT = 'project',
  EXAM = 'exam',
  PRESENTATION = 'presentation'
}

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({
    type: 'enum',
    enum: AssignmentType,
    default: AssignmentType.HOMEWORK
  })
  type: AssignmentType;

  @Column({ type: 'int' })
  maxScore: number;

  @Column({ type: 'date' })
  dueDate: Date;

  @Column({ type: 'date', nullable: true })
  assignedDate: Date;

  @Column({ nullable: true })
  instructions: string;

  @Column({ nullable: true })
  attachments: string; // JSON string for file paths

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  averageScore: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Class, classEntity => classEntity.assignments)
  @JoinColumn()
  class: Class;

  @OneToMany(() => Grade, grade => grade.assignment)
  grades: Grade[];

  // Virtual field for completion rate
  get completionRate(): number {
    if (!this.grades || this.grades.length === 0) return 0;
    const completedGrades = this.grades.filter(grade => grade.score !== null);
    return (completedGrades.length / this.grades.length) * 100;
  }

  // Virtual field to check if assignment is overdue
  get isOverdue(): boolean {
    return new Date() > new Date(this.dueDate);
  }
}
