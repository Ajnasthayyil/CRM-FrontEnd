export interface AttendanceRecord {
  id: string;
  date: string;
  userId: string;
  userName: string;
  userType: 'Teacher' | 'Student';
  departmentId: number;
  status: 'Present' | 'Absent' | 'Leave' | 'Late' | 'Half Day';
  markedBy: string;
  detailInfo?: string; // Subject for teacher, Class/Batch for student
}
