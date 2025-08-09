import { Router, Response } from 'express';
import { authenticate, authorize, AuthRequest } from '../middleware/auth';
import { UserRole } from '../entities/User';

const router = Router();

// All student routes require authentication
router.use(authenticate);

// @route   GET /api/student/dashboard
// @desc    Get student dashboard data
// @access  Private (Student only)
router.get('/dashboard', authorize(UserRole.STUDENT), async (req: AuthRequest, res: Response) => {
  try {
    // Mock data for now - will be replaced with actual database queries
    const dashboardData = {
      currentGrade: 'A-',
      totalSubjects: 6,
      completedAssignments: 12,
      upcomingExams: 3,
      strongSubjects: ['Mathematics', 'Physics'],
      weakSubjects: ['Chemistry', 'English'],
      recentScores: [85, 92, 78, 88, 95],
      recentActivity: [
        {
          type: 'assignment',
          title: 'Mathematics Assignment Submitted',
          description: 'Score: 95% - Excellent work!',
          date: new Date()
        },
        {
          type: 'test',
          title: 'Physics Test Completed',
          description: 'Score: 88% - Great improvement!',
          date: new Date()
        }
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

// @route   GET /api/student/profile
// @desc    Get student profile
// @access  Private (Student only)
router.get('/profile', authorize(UserRole.STUDENT), async (req: AuthRequest, res: Response) => {
  try {
    const user = req.user!;
    
    res.status(200).json({
      success: true,
      message: 'Profile retrieved successfully',
      data: {
        user: user.toJSON(),
        student: user.student
      }
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve profile'
    });
  }
});

// @route   GET /api/student/grades
// @desc    Get student grades
// @access  Private (Student only)
router.get('/grades', authorize(UserRole.STUDENT), async (req: AuthRequest, res: Response) => {
  try {
    // Mock data for now
    const grades = [
      { subject: 'Mathematics', score: 92, maxScore: 100, percentage: 92, letterGrade: 'A' },
      { subject: 'Physics', score: 88, maxScore: 100, percentage: 88, letterGrade: 'B+' },
      { subject: 'Chemistry', score: 75, maxScore: 100, percentage: 75, letterGrade: 'C+' },
      { subject: 'English', score: 82, maxScore: 100, percentage: 82, letterGrade: 'B' },
      { subject: 'Biology', score: 79, maxScore: 100, percentage: 79, letterGrade: 'C+' },
      { subject: 'History', score: 85, maxScore: 100, percentage: 85, letterGrade: 'B' }
    ];

    res.status(200).json({
      success: true,
      message: 'Grades retrieved successfully',
      data: grades
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve grades'
    });
  }
});

// @route   GET /api/student/attendance
// @desc    Get student attendance
// @access  Private (Student only)
router.get('/attendance', authorize(UserRole.STUDENT), async (req: AuthRequest, res: Response) => {
  try {
    // Mock data for now
    const attendance = {
      totalDays: 180,
      presentDays: 165,
      absentDays: 15,
      attendancePercentage: 91.7,
      recentAttendance: [
        { date: '2024-08-09', status: 'present' },
        { date: '2024-08-08', status: 'present' },
        { date: '2024-08-07', status: 'absent' },
        { date: '2024-08-06', status: 'present' },
        { date: '2024-08-05', status: 'present' }
      ]
    };

    res.status(200).json({
      success: true,
      message: 'Attendance retrieved successfully',
      data: attendance
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to retrieve attendance'
    });
  }
});

export default router;
