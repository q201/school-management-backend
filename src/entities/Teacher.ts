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
import { Class } from './Class';

@Entity('teachers')
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  teacherId: string; // Teacher ID number (e.g., TCH2024001)

  @Column()
  department: string; // Mathematics, Science, English, etc.

  @Column()
  qualification: string; // B.Ed, M.Ed, Ph.D, etc.

  @Column({ type: 'date' })
  joiningDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  salary: number;

  @Column({ nullable: true })
  specialization: string; // Area of expertise

  @Column({ type: 'int', default: 0 })
  experienceYears: number;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  emergencyContact: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  performanceRating: number; // Out of 100

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // Relationships
  @OneToOne(() => User, user => user.teacher)
  @JoinColumn()
  user: User;

  @OneToMany(() => Class, classEntity => classEntity.teacher)
  classes: Class[];

  // Virtual field for full name from user
  get fullName(): string {
    return this.user ? this.user.fullName : '';
  }

  // Virtual field for total classes taught
  get totalClasses(): number {
    return this.classes ? this.classes.length : 0;
  }
}
