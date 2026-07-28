export interface Student {
  studentId: string;
  studentName: string;
  classId: string; // E.g., '10A'
  className: string; // E.g., 'Class 10'
  section: string; // E.g., 'A'
  rollNumber: string;
  departmentId: number;
  email: string;
  phone: string;
  address?: string;
  emergencyContact?: string;
  notes?: string;
  attendancePercentage: number;
  performancePercentage: number;
  status: 'Active' | 'Blocked';
  dateOfBirth?: string;
  parentName?: string;
  photoUrl?: string;
}
