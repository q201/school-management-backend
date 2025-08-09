import { Router, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { UserRole } from '../entities/User';

const router = Router();

// All teacher routes require authentication
router.use(authenticate);

// @route   GET /api/teacher/dashboard
// @desc    Get teacher dashboard data
// @access  Private (Teacher only)
router.get('/dashboard', authorize(UserRole.TEACHER), async (req: AuthRequest, res: Response) => {
  try {
    // Mock data for now - will be replaced with actual database queries
    const dashboardData = {
      totalClasses: 4,
      totalStudents: 120,
      averagePerformance: 82,
      upcomingClasses: 6,
      classes: [
        { name: 'Mathematics 10A', students: 30, avgScore: 85, trend: 'up' },
        { name: 'Mathematics 10B', students: 28, avgScore: 78, trend: 'down' },
        { name: 'Advanced Math 11', students: 25, avgScore: 92, trend: 'up' },
        { name: 'Calculus 12', students: 22, avgScore: 88, trend: 'up' }
      ],
      topPerformers: [
        { name: 'Alice Johnson', class: 'Math 10A', score: 98 },
        { name: 'Bob Smith', class: 'Advanced Math 11', score: 96 },
        { name: 'Carol Davis', class: 'Calculus 12', score: 94 },
        { name: 'David Wilson', class: 'Math 10B', score: 92 }
      ],
      studentsNeedingAttention: [
        { name: 'Emma Brown', class: 'Math 10B', score: 58, issue: 'Low attendance' },
        { name: 'Frank Miller', class: 'Math 10A', score: 62, issue: 'Missing assignments' },
        { name: 'Grace Lee', class: 'Calculus 12', score: 65, issue: 'Struggling with concepts' }
      ]
    };

    res.status(200).json({
      success: true,
      message: 'Dashboard data retrieved successfully',
      data: dashboardData
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve dashboard data'
    });
  }
});

// @route   GET /api/teacher/profile
// @desc    Get teacher profile
// @access  Private (Teacher only)
router.get('/profile', authorize(UserRole.TEACHER), async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    
    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: {
        user: user.toJSON(),
        teacher: user.teacher
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve profile'
    });
  }
});

// @route   GET /api/teacher/classes
// @desc    Get teacher's classes
// @access  Private (Teacher only)
router.get('/classes', authorize(UserRole.TEACHER), async (req: AuthRequest, res: Response) => {
  try {
    // Mock data for now
    const classes = [
      {
        id: '1',
        name: 'Mathematics 10A',
        subject: 'Mathematics',
        grade: 10,
        section: 'A',
        students: 30,
        avgScore: 85,
        schedule: 'Mon, Wed, Fri - 9:00 AM'
      },
      {
        id: '2',
        name: 'Mathematics 10B',
        subject: 'Mathematics',
        grade: 10,
        section: 'B',
        students: 28,
        avgScore: 78,
        schedule: 'Tue, Thu - 10:00 AM'
      }
    ];

    res.status(200).json({
      success: true,
      message: 'Classes retrieved successfully',
      data: classes
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve classes'
    });
  }
});

// @route   GET /api/teacher/students
// @desc    Get students in teacher's classes
// @access  Private (Teacher only)
router.get('/students', authorize(UserRole.TEACHER), async (req: AuthRequest, res: Response) => {
  try {
    // Mock data for now
    const students = [
      {
        id: '1',
        name: 'Alice Johnson',
        studentId: 'STU2024001',
        class: 'Mathematics 10A',
        currentGrade: 'A',
        attendance: 95,
        lastAssignmentScore: 98
      },
      {
        id: '2',
        name: 'Bob Smith',
        studentId: 'STU2024002',
        class: 'Mathematics 10B',
        currentGrade: 'B+',
        attendance: 88,
        lastAssignmentScore: 85
      }
    ];

    res.status(200).json({
      success: true,
      message: 'Students retrieved successfully',
      data: students
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve students'
    });
  }
});

export default router;
