export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  rollNumber: string;
  date: string;
  classId: string;
  section: string;
  subjectId: string;
  sessionId?: string;
  status: 'Present' | 'Absent' | 'Late' | 'Leave';
  departmentId: number;
  teacherId: number;
}
