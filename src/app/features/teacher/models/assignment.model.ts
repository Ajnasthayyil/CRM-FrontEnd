export interface Assignment {
  id: string;
  title: string;
  description: string;
  subjectId: string;
  subject: string;
  classId: string;
  className: string;
  section: string;
  type: 'Homework' | 'Classwork' | 'Project' | 'Quiz' | 'Practice' | 'Research';
  createdDate: string;
  dueDate: string;
  totalMarks: number;
  instructions: string;
  attachment?: string;
  status: 'Draft' | 'Published';
  departmentId: number;
  teacherId: number;
  
  // Computed stats for display
  totalStudents?: number;
  submittedCount?: number;
  pendingCount?: number;
  lateCount?: number;
}

export interface AssignmentSubmission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedDate: string;
  status: 'Submitted' | 'Pending' | 'Late' | 'Reviewed';
  score?: number;
  feedback?: string;
}
