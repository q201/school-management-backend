import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { User } from './User';
import { Enrollment } from './Enrollment';
import { Grade } from './Grade';
import { Attendance } from './Attendance';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  studentId: string; // Student ID number (e.g., STU2024001)

  @Column()
  grade: number; // Grade level (7, 8, 9, 10, 11, 12)

  @Column()
  section: string; // Section (A, B, C, etc.)

  @Column({ nullable: true })
  rollNumber: number;

  @Column({ type: 'date' })
  dateOfBirth: Date;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  parentName: string;

  @Column({ nullable: true })
  parentPhone: string;

  @Column({ nullable: true })
  parentEmail: string;

  @Column({ nullable: true })
  emergencyContact: string;

  @Column({ type: 'date' })
  admissionDate: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  currentGPA: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToOne(() => User, user => user.student)
  @JoinColumn()
  user: User;

  @OneToMany(() => Enrollment, enrollment => enrollment.student)
  enrollments: Enrollment[];

  @OneToMany(() => Grade, grade => grade.student)
  grades: Grade[];

  @OneToMany(() => Attendance, attendance => attendance.student)
  attendances: Attendance[];

  // Virtual field for current academic year
  get academicYear(): string {
    const currentYear = new Date().getFullYear();
    return `${currentYear}-${currentYear + 1}`;
  }

  // Virtual field for full grade and section
  get gradeSection(): string {
    return `${this.grade}${this.section}`;
  }
}
