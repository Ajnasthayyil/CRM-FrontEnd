export interface ClassInfo {
  id: string;
  className: string;
  subjectId: string;
  subject: string;
  section: string;
  academicYear: string;
  room: string;
  schedule: string;
  startTime: string;
  endTime: string;
  description: string;
  departmentId: number;
  teacherId: number;
  totalStudents: number;
  nextSessionDate?: string;
}

export interface Session {
  id: string;
  classId: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  topic: string;
  lessonObjective: string;
  notes: string;
  departmentId: number;
  teacherId: number;
}
