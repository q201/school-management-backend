import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';
import { Class } from './Class';

export enum TermType {
  SEMESTER = 'semester',
  QUARTER = 'quarter',
  TRIMESTER = 'trimester',
  ANNUAL = 'annual'
}

@Entity('academic_terms')
export class AcademicTerm {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string; // e.g., "Fall 2024", "Spring 2025"

  @Column({
    type: 'enum',
    enum: TermType,
    default: TermType.SEMESTER
  })
  type: TermType;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column()
  academicYear: string; // e.g., "2024-2025"

  @Column({ default: false })
  isActive: boolean;

  @Column({ default: false })
  isCurrent: boolean;

  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToMany(() => Class, classEntity => classEntity.academicTerm)
  classes: Class[];

  // Virtual field for term duration in days
  get durationDays(): number {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    return Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }

  // Virtual field to check if term is currently active
  get isCurrentlyActive(): boolean {
    const now = new Date();
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);
    return now >= start && now <= end;
  }
}
