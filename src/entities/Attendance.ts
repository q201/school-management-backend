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

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
  EXCUSED = 'excused'
}

@Entity('attendances')
@Unique(['student', 'class', 'date'])
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({
    type: 'enum',
    enum: AttendanceStatus,
    default: AttendanceStatus.PRESENT
  })
  status: AttendanceStatus;

  @Column({ type: 'time', nullable: true })
  checkInTime: string;

  @Column({ type: 'time', nullable: true })
  checkOutTime: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'text', nullable: true })
  reason: string; // Reason for absence or lateness

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @ManyToOne(() => Student, student => student.attendances)
  @JoinColumn()
  student: Student;

  @ManyToOne(() => Class, classEntity => classEntity)
  @JoinColumn()
  class: Class;

  // Virtual field to check if student was on time
  get isOnTime(): boolean {
    return this.status === AttendanceStatus.PRESENT;
  }

  // Virtual field to get attendance points (for calculation)
  get attendancePoints(): number {
    switch (this.status) {
      case AttendanceStatus.PRESENT:
        return 1;
      case AttendanceStatus.LATE:
        return 0.5;
      case AttendanceStatus.EXCUSED:
        return 0.8;
      case AttendanceStatus.ABSENT:
      default:
        return 0;
    }
  }
}
