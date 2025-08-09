import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Unique
} from 'typeorm';
import { Student } from './Student';
import { Assignment } from './Assignment';

@Entity('grades')
@Unique(['student', 'assignment'])
export class Grade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  score: number;

  @Column({ type: 'int' })
  maxScore: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  percentage: number;

  @Column({ nullable: true })
  letterGrade: string; // A+, A, B+, B, etc.

  @Column({ type: 'date', nullable: true })
  submittedDate: Date;

  @Column({ type: 'date', nullable: true })
  gradedDate: Date;

  @Column({ type: 'text', nullable: true })
  feedback: string;

  @Column({ type: 'text', nullable: true })
  teacherComments: string;

  @Column({ default: false })
  isLate: boolean;

  @Column({ default: false })
  isExcused: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Student, student => student.grades)
  @JoinColumn()
  student: Student;

  @ManyToOne(() => Assignment, assignment => assignment.grades)
  @JoinColumn()
  assignment: Assignment;

  // Method to calculate percentage
  calculatePercentage(): number {
    if (this.score === null || this.maxScore === 0) return 0;
    return (this.score / this.maxScore) * 100;
  }

  // Method to determine letter grade
  calculateLetterGrade(): string {
    const percentage = this.percentage || this.calculatePercentage();
    
    if (percentage >= 97) return 'A+';
    if (percentage >= 93) return 'A';
    if (percentage >= 90) return 'A-';
    if (percentage >= 87) return 'B+';
    if (percentage >= 83) return 'B';
    if (percentage >= 80) return 'B-';
    if (percentage >= 77) return 'C+';
    if (percentage >= 73) return 'C';
    if (percentage >= 70) return 'C-';
    if (percentage >= 67) return 'D+';
    if (percentage >= 65) return 'D';
    return 'F';
  }
}
