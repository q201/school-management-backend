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
import { Class } from './Class';

export enum EnrollmentStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  DROPPED = 'dropped',
  TRANSFERRED = 'transferred'
}

@Entity('enrollments')
@Unique(['student', 'class'])
export class Enrollment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  enrollmentDate: Date;

  @Column({
    type: 'enum',
    enum: EnrollmentStatus,
    default: EnrollmentStatus.ACTIVE
  })
  status: EnrollmentStatus;

  @Column({ type: 'date', nullable: true })
  completionDate: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  finalGrade: number;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Student, student => student.enrollments)
  @JoinColumn()
  student: Student;

  @ManyToOne(() => Class, classEntity => classEntity.enrollments)
  @JoinColumn()
  class: Class;

  // Virtual field for enrollment duration
  get enrollmentDuration(): number {
    const endDate = this.completionDate || new Date();
    const startDate = new Date(this.enrollmentDate);
    return Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  }
}
