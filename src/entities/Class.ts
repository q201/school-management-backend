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
import { Teacher } from './Teacher';
import { Enrollment } from './Enrollment';
import { Assignment } from './Assignment';
import { AcademicTerm } from './AcademicTerm';

@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // e.g., "Mathematics 10A"

  @Column()
  subject: string; // Mathematics, Physics, Chemistry, etc.

  @Column()
  grade: number; // Grade level (7, 8, 9, 10, 11, 12)

  @Column()
  section: string; // Section (A, B, C, etc.)

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'int', default: 0 })
  maxStudents: number;

  @Column({ type: 'int', default: 0 })
  currentStudents: number;

  @Column({ nullable: true })
  classroom: string; // Room number or location

  @Column({ nullable: true })
  schedule: string; // JSON string for class schedule

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  averageScore: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Teacher, teacher => teacher.classes)
  @JoinColumn()
  teacher: Teacher;

  @ManyToOne(() => AcademicTerm, term => term.classes)
  @JoinColumn()
  academicTerm: AcademicTerm;

  @OneToMany(() => Enrollment, enrollment => enrollment.class)
  enrollments: Enrollment[];

  @OneToMany(() => Assignment, assignment => assignment.class)
  assignments: Assignment[];

  // Virtual field for full class name
  get fullName(): string {
    return `${this.subject} ${this.grade}${this.section}`;
  }

  // Virtual field for enrollment percentage
  get enrollmentPercentage(): number {
    if (this.maxStudents === 0) return 0;
    return (this.currentStudents / this.maxStudents) * 100;
  }
}
