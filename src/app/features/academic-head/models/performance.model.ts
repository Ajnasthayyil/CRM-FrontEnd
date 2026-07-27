export interface PerformanceReview {
  id: string;
  teacherId: string;
  teacherName: string;
  departmentId: number;
  reviewPeriod: 'Monthly' | 'Quarterly' | 'Half Yearly' | 'Annual';
  overallScore: number; // 1-5
  teachingQuality: number;
  subjectKnowledge: number;
  communication: number;
  classroomManagement: number;
  studentEngagement: number;
  lessonPlanning: number;
  attendanceAndPunctuality: number;
  discipline: number;
  professionalism: number;
  strengths: string;
  areasForImprovement: string;
  academicHeadRemarks: string;
  recommendations: string;
  status: 'Excellent' | 'Very Good' | 'Good' | 'Needs Improvement' | 'Unsatisfactory';
  reviewedDate: string;
}
