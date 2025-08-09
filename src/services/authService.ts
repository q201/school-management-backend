import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User, UserRole } from '../entities/User';
import { Student } from '../entities/Student';
import { Teacher } from '../entities/Teacher';

export interface LoginCredentials {
  email: string;
  password: string;
  role: UserRole;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phone?: string;
}

export class AuthService {
  private userRepository = AppDataSource.getRepository(User);
  private studentRepository = AppDataSource.getRepository(Student);
  private teacherRepository = AppDataSource.getRepository(Teacher);

  async login(credentials: LoginCredentials) {
    const { email, password, role } = credentials;

    // Find user by email and role
    const user = await this.userRepository.findOne({
      where: { email, role },
      relations: ['student', 'teacher']
    });

    if (!user || !user.isActive) {
      throw new Error('Invalid credentials');
    }

    // Validate password
    const isValidPassword = await user.validatePassword(password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Generate JWT token
    const token = this.generateToken(user.id);

    // Update last login
    user.lastLogin = new Date();
    await this.userRepository.save(user);

    return {
      token,
      user: user.toJSON(),
      role: user.role
    };
  }

  async register(userData: RegisterData) {
    const { email, role } = userData;

    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { email }
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create user
    const user = this.userRepository.create(userData);
    const savedUser = await this.userRepository.save(user);

    // Create role-specific profile
    if (role === UserRole.STUDENT) {
      await this.createStudentProfile(savedUser);
    } else if (role === UserRole.TEACHER) {
      await this.createTeacherProfile(savedUser);
    }

    // Generate token
    const token = this.generateToken(savedUser.id);

    return {
      token,
      user: savedUser.toJSON(),
      role: savedUser.role
    };
  }

  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
      
      const user = await this.userRepository.findOne({
        where: { id: decoded.userId },
        relations: ['student', 'teacher']
      });

      if (!user || !user.isActive) {
        throw new Error('User not found or inactive');
      }

      return user.toJSON();
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId }
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await user.validatePassword(oldPassword);
    if (!isValidPassword) {
      throw new Error('Current password is incorrect');
    }

    user.password = newPassword;
    await this.userRepository.save(user);

    return { message: 'Password changed successfully' };
  }

  private generateToken(userId: string): string {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );
  }

  private async createStudentProfile(user: User) {
    const currentYear = new Date().getFullYear();
    const studentCount = await this.studentRepository.count();
    
    const student = this.studentRepository.create({
      user,
      studentId: `STU${currentYear}${String(studentCount + 1).padStart(3, '0')}`,
      grade: 9, // Default grade
      section: 'A', // Default section
      dateOfBirth: new Date('2005-01-01'), // Default DOB
      admissionDate: new Date()
    });

    await this.studentRepository.save(student);
  }

  private async createTeacherProfile(user: User) {
    const currentYear = new Date().getFullYear();
    const teacherCount = await this.teacherRepository.count();
    
    const teacher = this.teacherRepository.create({
      user,
      teacherId: `TCH${currentYear}${String(teacherCount + 1).padStart(3, '0')}`,
      department: 'General', // Default department
      qualification: 'B.Ed', // Default qualification
      joiningDate: new Date()
    });

    await this.teacherRepository.save(teacher);
  }
}
