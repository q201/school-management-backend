import { Router, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { UserRole } from '../entities/User';

const router = Router();

// All admin routes require authentication
router.use(authenticate);

// @route   GET /api/admin/dashboard
// @desc    Get admin dashboard data
// @access  Private (Admin only)
router.get('/dashboard', authorize(UserRole.ADMIN), async (req: AuthRequest, res: Response) => {
  try {
    // Mock data for now - will be replaced with actual database queries
    const dashboardData = {
      totalStudents: 1250,
      totalTeachers: 85,
      totalClasses: 45,
      schoolPerformance: 78,
      gradePerformance: [
        { grade: 'Grade 12', performance: 85, students: 180 },
        { grade: 'Grade 11', performance: 82, students: 195 },
        { grade: 'Grade 10', performance: 78, students: 210 },
        { grade: 'Grade 9', performance: 75, students: 225 },
        { grade: 'Grade 8', performance: 73, students: 240 },
        { grade: 'Grade 7', performance: 71, students: 200 }
      ],
      topPerformingClasses: [
        { name: 'Mathematics 12A', teacher: 'Dr. Smith', avgScore: 92 },
        { name: 'Physics 11B', teacher: 'Prof. Johnson', avgScore: 89 },
        { name: 'Chemistry 10A', teacher: 'Ms. Davis', avgScore: 87 }
      ],
      teacherPerformance: {
        excellent: 25, // 90%+
        good: 45,      // 80-89%
        average: 12,   // 70-79%
        needsSupport: 3 // <70%
      },
      recentAlerts: [
        { type: 'warning', message: 'Low attendance in Class 9B', priority: 'medium' },
        { type: 'info', message: 'New teacher orientation scheduled', priority: 'low' },
        { type: 'urgent', message: 'Parent complaint requires attention', priority: 'high' }
      ]
    };

    res.status(200).json({
      success: true,
      message: 'Admin dashboard data retrieved successfully',
      data: dashboardData
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve dashboard data'
    });
  }
});

// @route   GET /api/admin/students
// @desc    Get all students
// @access  Private (Admin only)
router.get('/students', authorize(UserRole.ADMIN), async (req: AuthRequest, res: Response) => {
  try {
    // Mock data for now
    const students = [
      {
        id: '1',
        studentId: 'STU2024001',
        name: 'Alice Johnson',
        grade: 10,
        section: 'A',
        currentGPA: 3.8,
        attendance: 95,
        status: 'active'
      },
      {
        id: '2',
        studentId: 'STU2024002',
        name: 'Bob Smith',
        grade: 11,
        section: 'B',
        currentGPA: 3.6,
        attendance: 88,
        status: 'active'
      }
    ];

    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      data: students,
      total: students.length
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve students'
    });
  }
});

// @route   GET /api/admin/teachers
// @desc    Get all teachers
// @access  Private (Admin only)
router.get('/teachers', authorize(UserRole.ADMIN), async (req: AuthRequest, res: Response) => {
  try {
    // Mock data for now
    const teachers = [
      {
        id: '1',
        teacherId: 'TCH2024001',
        name: 'Dr. Smith',
        department: 'Mathematics',
        qualification: 'Ph.D',
        experienceYears: 15,
        performanceRating: 92,
        totalClasses: 4,
        status: 'active'
      },
      {
        id: '2',
        teacherId: 'TCH2024002',
        name: 'Prof. Johnson',
        department: 'Physics',
        qualification: 'M.Sc',
        experienceYears: 10,
        performanceRating: 89,
        totalClasses: 3,
        status: 'active'
      }
    ];

    res.status(200).json({
      success: true,
      message: 'Teachers retrieved successfully',
      data: teachers,
      total: teachers.length
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve teachers'
    });
  }
});

// @route   GET /api/admin/classes
// @desc    Get all classes
// @access  Private (Admin only)
router.get('/classes', authorize(UserRole.ADMIN), async (req: AuthRequest, res: Response) => {
  try {
    // Mock data for now
    const classes = [
      {
        id: '1',
        name: 'Mathematics 10A',
        subject: 'Mathematics',
        grade: 10,
        section: 'A',
        teacher: 'Dr. Smith',
        maxStudents: 35,
        currentStudents: 30,
        averageScore: 85,
        status: 'active'
      },
      {
        id: '2',
        name: 'Physics 11B',
        subject: 'Physics',
        grade: 11,
        section: 'B',
        teacher: 'Prof. Johnson',
        maxStudents: 30,
        currentStudents: 28,
        averageScore: 89,
        status: 'active'
      }
    ];

    res.status(200).json({
      success: true,
      message: 'Classes retrieved successfully',
      data: classes,
      total: classes.length
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve classes'
    });
  }
});

// @route   GET /api/admin/reports
// @desc    Get system reports
// @access  Private (Admin only)
router.get('/reports', authorize(UserRole.ADMIN), async (req: AuthRequest, res: Response) => {
  try {
    // Mock data for now
    const reports = {
      academicPerformance: {
        overallAverage: 78.5,
        topPerformingGrade: 'Grade 12',
        improvementNeeded: 'Grade 9'
      },
      attendance: {
        schoolWideAttendance: 89.2,
        bestAttendanceGrade: 'Grade 12',
        lowestAttendanceGrade: 'Grade 9'
      },
      teacherEffectiveness: {
        averageRating: 85.3,
        topPerformer: 'Dr. Smith',
        trainingNeeded: 3
      }
    };

    res.status(200).json({
      success: true,
      message: 'Reports retrieved successfully',
      data: reports
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve reports'
    });
  }
});

export default router;
