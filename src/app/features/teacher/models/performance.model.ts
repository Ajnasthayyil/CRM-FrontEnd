export interface PerformanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  subject: string;
  assessmentType: 'Assignment' | 'Quiz' | 'Class Test' | 'Mid Term' | 'Final Exam' | 'Project' | 'Practical';
  assessmentName: string;
  maximumMarks: number;
  obtainedMarks: number;
  percentage: number;
  grade: string;
  date: string;
  strengths: string;
  areasForImprovement: string;
  teacherRemarks: string;
  departmentId: number;
  teacherId: number;
}
