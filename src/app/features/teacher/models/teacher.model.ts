export interface Teacher {
  teacherId: number;
  teacherName: string;
  role: string;
  departmentId: number;
  departmentName: string;
  email?: string;
  phone?: string;
  subjects?: string[];
  qualification?: string;
  experience?: string;
}
